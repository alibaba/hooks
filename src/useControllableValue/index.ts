import { useMemo, useState, useCallback } from 'react';
import useUpdateEffect from '../useUpdateEffect';
/**
 * 在某些组件中，我们需要状态由自身管理或由其父级控制。
 * useControllableValue是一个Hook，可以帮助您管理这种状态。
 */
export interface Options<T> {
  // 默认值，将被props.defaultValue和props.value覆盖
  defaultValue?: T;
  // 自定义defaultVlue属性名称
  defaultValuePropName?: string;
  // 自定义值属性名称
  valuePropName?: string;
  // 自定义触发器属性名称
  trigger?: string;
}

export interface Props {
  [key: string]: any;
}

/**
 *
 * @param props 组件的props
 * @param options 可选配置项，请参阅选项
 * options as Options
 */
export default function useControllableValue<T>(props: Props = {}, options: Options<T> = {}) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options;

  // 初始化值
  const value = props[valuePropName];

  /**
   * useMemo 设置初始值
   */
  const initialValue = useMemo(() => {
    // 如果props中存在valuePropName, 就返回value
    if (valuePropName in props) {
      return value;
    }

    // props, DefaultValuePropName如果存在props， 就返回props[defaultValuePropName]
    if (defaultValuePropName in props) {
      return props[defaultValuePropName];
    }
    // 否则返回初始值
    return defaultValue;
  }, []);

  const [state, setState] = useState<T | undefined>(initialValue);

  /* init 的时候不用执行了 */
  useUpdateEffect(() => {
    if (valuePropName in props) {
      setState(value);
    }
  }, [value]);

  /**
   * handleSetState： 操作执行setState
   * 采用useCallback提高效率， 返回方法
   * 当props, valuePropName, trigger改变时，执行
   */
  const handleSetState = useCallback(
    (v: T | undefined) => {
      // 如果valuePropName 不再props属性中，将v设置会去
      if (!(valuePropName in props)) {
        setState(v);
      }
      // 验证trigge是否在props中，执行props[trigger](v);
      if (props[trigger]) {
        props[trigger](v);
      }
    },
    [props, valuePropName, trigger],
  );
  // 返回 state， handleSetState
  return [state, handleSetState] as const;
}
