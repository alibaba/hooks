import { useCallback, useState, useMemo } from 'react';

type IState = string | number | boolean | undefined;

function useToggle<T = boolean | undefined>(): {
  state: boolean;
  toggle: (value?: T) => void;
  setLeft: () => void;
  setRight: () => void;
};

function useToggle<T = IState>(
  defaultValue: T,
): {
  state: T;
  toggle: (value?: T) => void;
  setLeft: () => void;
  setRight: () => void;
};

function useToggle<T = IState, U = IState>(
  defaultValue: T,
  reverseValue: U,
): {
  state: T | U;
  toggle: (value?: T | U) => void;
  setLeft: () => void;
  setRight: () => void;
};

function useToggle(defaultValue?: IState, reverseValue?: IState) {
  const [state, setState] = useState(defaultValue);

  const defaultValueOrigin = useMemo(() => (defaultValue === undefined ? false : defaultValue), [defaultValue]);

  const reverseValueOrigin = useMemo(() => (reverseValue === undefined ? !defaultValue : reverseValue), [reverseValue]);

  // 切换返回值
  const toggle = useCallback(
    (value?: IState) => {
      // 强制返回状态值，适用于点击操作
      if (value !== undefined) {
        setState(value);
        return;
      }
      const data = state === defaultValueOrigin ? reverseValueOrigin : defaultValueOrigin;
      setState(data);
    },
    [state],
  );

  // 设置默认值
  const setLeft = useCallback(() => {
    setState(defaultValueOrigin);
  }, [state]);

  // 设置取反值
  const setRight = useCallback(() => {
    setState(reverseValueOrigin);
  }, [state]);

  return {
    state,
    toggle,
    setLeft,
    setRight,
  };
}

export default useToggle;
