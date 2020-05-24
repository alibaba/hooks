import { useCallback, useState, useMemo } from 'react';

type IState = string | number | boolean | undefined;

export interface Actions<T = IState> {
  setLeft: () => void;
  setRight: () => void;
  toggle: (value?: T) => void;
}

function useToggle<T = boolean | undefined>(): [boolean, Actions];

function useToggle<T = IState>(
  defaultValue: T,
): [T, Actions];

function useToggle<T = IState, U = IState>(
  defaultValue: T,
  reverseValue: U,
): [T | U, Actions];

function useToggle<D extends IState = IState, R extends IState = IState>(
  defaultValue: D = false as D,
  reverseValue?: R,
) {
  const [state, setState] = useState<D | R>(defaultValue);
  const reverseValueOrigin = useMemo(
    () => (reverseValue === undefined ? !defaultValue : reverseValue) as D | R,
    [reverseValue],
  );



  const actions = useMemo(() => {
    // 切换返回值
    const toggle: () => void = (value?: D | R) => {
      // 强制返回状态值，适用于点击操作
      if (value !== undefined) {
        setState(value);
        return;
      }
      const data = state === defaultValue ? reverseValueOrigin : defaultValue;
      setState(data);
    }
    // 设置默认值
    const setLeft: () => void = () => setState(defaultValue);
    // 设置取反值
    const setRight: () => void = () => setState(reverseValueOrigin);
    return {
      toggle,
      setLeft,
      setRight,
    }
  }, [setState, state]);

  return [
    state,
    actions
  ]
}

export default useToggle;
