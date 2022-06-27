import { useCallback, useState } from 'react';
import { isFunction } from '../utils';

type State<S, K extends keyof S> = Pick<S, K> | S | null;

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: State<S, K> | ((prevState: Readonly<S>) => State<S, K>),
) => void;

const useSetState = <S extends Record<string, any>>(
  initialState: S | (() => S),
): [S, SetState<S>] => {
  const [state, setState] = useState<S>(initialState);

  const setMergeState = useCallback((patch) => {
    setState((prevState) => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, setMergeState];
};

export default useSetState;
