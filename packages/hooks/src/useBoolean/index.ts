import { useMemo } from 'react';
import useToggle from '../useToggle';

export interface Actions {
  setTrue: () => void;
  setFalse: () => void;
  set: (value: boolean) => void;
  toggle: () => void;
}

/**
 * Elegantly manages boolean state.
 * @see https://ahooks.js.org/hooks/use-boolean
 * @example
 * ```jsx
 * const [state, { toggle, setTrue, setFalse }] = useBoolean(true);
 * ```
 */
export default function useBoolean(defaultValue = false): [boolean, Actions] {
  const [state, { toggle, set }] = useToggle(!!defaultValue);

  const actions: Actions = useMemo(() => {
    const setTrue = () => set(true);
    const setFalse = () => set(false);
    return {
      toggle,
      set: (v) => set(!!v),
      setTrue,
      setFalse,
    };
  }, []);

  return [state, actions];
}
