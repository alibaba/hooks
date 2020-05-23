import { useCallback } from 'react';
import useToggle from '../useToggle';

const useBoolean = (defaultValue: boolean = false) => {
  const [ state, { toggle } ] = useToggle(defaultValue);

  const setTrue = useCallback(() => toggle(true), [toggle]);

  const setFalse = useCallback(() => toggle(false), [toggle]);

  return {
    state,
    toggle,
    setTrue,
    setFalse,
  };
};

export default useBoolean;
