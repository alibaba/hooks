import { useCallback, useState, useMemo } from 'react';

type IState = string | number | boolean | undefined;

/**
 * 使用函数的重载
 * 定义方法名
 * 泛型值
 * 参数及参数类型
 * 返回值
 */
// 情况1: 泛型为boolean|undefined; 没有参数； 确定返回值
function useToggle<T = boolean | undefined>(): {
  state: boolean;
  toggle: (value?: T) => void;
  setLeft: () => void;
  setRight: () => void;
};

// 情况2: 泛型为IState; 定义参数defaultValue; 确定返回值
function useToggle<T = IState>(
  defaultValue: T,
): {
  state: T;
  toggle: (value?: T) => void;
  setLeft: () => void;
  setRight: () => void;
};

// 情况3: 泛型为IState; 定义参数defaultValue， reverseValue;  确定返回值
function useToggle<T = IState, U = IState>(
  defaultValue: T,
  reverseValue: U,
): {
  state: T | U;
  toggle: (value?: T | U) => void;
  setLeft: () => void;
  setRight: () => void;
};

function useToggle<D extends IState = IState, R extends IState = IState>(
  //  类型断言（Type Assertion）可以用来手动指定一个值的类型 D =  fasle as D; 指定D默认值为false 定义类型为D
  defaultValue: D = false as D,
  // 可能存在，类型定义为R
  reverseValue?: R,
) {
  // 定义全局值state； 初始值为false
  const [state, setState] = useState<D | R>(defaultValue);

  // 处理性能优化； 1. 初始化执行1次； 2. 当reverseValue的值发生改变时，执行
  const reverseValueOrigin = useMemo(
    () => (reverseValue === undefined ? !defaultValue : reverseValue) as D | R,
    [reverseValue],
  );

  // 切换返回值
  /**
   * 使用useCallback处理性能
   */

  const toggle = useCallback(
    (value?: D | R) => {
      // 强制返回状态值，适用于点击操作
      if (value !== undefined) {
        setState(value);
        return;
      }
      // 执行此方法，用于设置值，如果第一次值为默认值，则直接设置成相反值
      const data = state === defaultValue ? reverseValueOrigin : defaultValue;
      setState(data);
    },
    [state],
  );

  // 设置默认值
  const setLeft = useCallback(() => {
    setState(defaultValue);
  }, [setState]);

  // 设置取反值
  const setRight = useCallback(() => {
    setState(reverseValueOrigin);
  }, [setState]);

  /**
   * 返回值
   * state: 当前值
   * toggle： 用于设置值，
   * setLeft: 设置默认值
   * setRight： 设置相反值
   */
  return {
    state,
    toggle,
    setLeft,
    setRight,
  };
}

export default useToggle;
