import { useCallback, useMemo } from 'react';
import useToggle from '../useToggle';

export interface Actions {
  setTrue : () => void;
  setFalse: () => void;
  toggle: (bool: any) => void;
}

export default function useBoolean(defaultValue = false): [boolean, Actions] {
    const { state, toggle } = useToggle(defaultValue);

    const actions: Actions = useMemo(() => {
        const setTrue: () => void = () => toggle(true);
        const setFalse: () => void = () => toggle(false);
        return { toggle, setTrue, setFalse }
    }, [toggle]);

    return [state, actions]
}
