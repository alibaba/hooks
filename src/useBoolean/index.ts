import { useCallback } from 'react';
import useToggle from '../useToggle';

const useBoolean = (defaultValue?: boolean) => {
  const { state, toggle } = useToggle(defaultValue);

  const setTrue = useCallback(() => toggle(true), []);

  const setFalse = useCallback(() => toggle(false), []);

  return {
    state,
    toggle,
    setTrue,
    setFalse,
  };
};

export default useBoolean;
