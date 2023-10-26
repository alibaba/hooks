import { useRef, useState, useCallback } from "react";
import { isFunction } from '../utils';

export default function useStateRef<T>(value?: T) {
  const [state, setState] = useState(value);
  const stateRef = useRef(state);

  const setStateRef = useCallback((patch: T | ((state?: T) => T)) => {
    const newState = isFunction(patch) ? patch(stateRef.current) : patch;
    stateRef.current = newState;
    setState(newState);
  }, [])

  const getState = useCallback(() => stateRef.current, []);
  return [state, setStateRef, getState] as const;
}
