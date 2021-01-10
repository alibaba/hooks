import { useCallback, useState } from 'react';
import useUpdateEffect from '../useUpdateEffect';

export interface Options<T> {
  defaultValue?: T;
  defaultValuePropName?: string;
  valuePropName?: string;
  trigger?: string;
}

export interface Props {
  [key: string]: any;
}

export default function useControllableValue<T>(props: Props = {}, options: Options<T> = {}) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options;

  const value = props[valuePropName];

  const [state, setState] = useState<T | undefined>(() => {
    if (valuePropName in props) {
      return value;
    }
    if (defaultValuePropName in props) {
      return props[defaultValuePropName];
    }
    return defaultValue;
  });

  /* init 的时候不用执行了 */
  useUpdateEffect(() => {
    if (valuePropName in props) {
      setState(value);
    }
  }, [value, valuePropName]);

  const handleSetState = useCallback(
    (v: T | undefined, ...args: any[]) => {
      if (!(valuePropName in props)) {
        setState(v);
      }
      if (props[trigger]) {
        props[trigger](v, ...args);
      }
    },
    [props, valuePropName, trigger],
  );

  return [state, handleSetState] as const;
}
