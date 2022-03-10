import { useCallback, useEffect, useRef, useState } from 'react';
import { isFunction } from '../utils';

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
  callback?: (state: S) => void,
) => void;

const useSetState = <S extends Record<string, any>>(
  initialState: S | (() => S),
): [S, SetState<S>] => {
  const [state, setState] = useState<S>(initialState);

  const callbackRef = useRef<((state: S) => void)[]>([]);
  useEffect(
    function () {
      callbackRef.current.forEach?.((fn) => {
        fn(state);
      });
      callbackRef.current = [];
    },
    [state],
  );

  const setMergeState = useCallback((patch, callback) => {
    setState((prevState) => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
    if (!callback) return;
    callbackRef.current = [...callbackRef.current, callback];
  }, []);

  return [state, setMergeState];
};

export default useSetState;
