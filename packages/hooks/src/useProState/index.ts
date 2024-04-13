import { useState, type Dispatch, type SetStateAction, useCallback } from 'react';
import useLatest from '../useLatest';
import { isFunction } from '../utils';

export type SetMergeState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
) => void;
export type DispatchType<S> = Dispatch<SetStateAction<S>>;

function useProState<S extends Record<string, any>>(
  initialState?: S | (() => S),
): [
  S,
  {
    setState: DispatchType<S>;
    getState: () => S;
    resetState: () => void;
    setMergeState: SetMergeState<S>;
  },
];

function useProState<S>(initialState?: S | (() => S)): [
  S,
  {
    setState: DispatchType<S>;
    getState: () => S;
    resetState: () => void;
    setMergeState: (s: Record<string, any>) => void;
  },
];

function useProState<S>(initialState: S) {
  const [state, setState] = useState<S>(initialState);
  const latestValue = useLatest(state);

  const getState = useCallback(() => latestValue.current, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  const setMergeState = useCallback((patch) => {
    setState((prevState) => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, { setState, getState, resetState, setMergeState }];
}

export default useProState;
