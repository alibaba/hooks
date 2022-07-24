import { useCallback, useState } from 'react';
import { isFunction } from '../utils';

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
) => void;

export type ReSetState = () => void;

const useSetState = <S extends Record<string, any>>(
  initialState: S | (() => S),
): readonly [S, SetState<S>, ReSetState] => {
  const [state, setState] = useState<S>(initialState);

  const setMergeState = useCallback((patch) => {
    setState((prevState) => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  return [state, setMergeState, resetState] as const;
};

export default useSetState;
