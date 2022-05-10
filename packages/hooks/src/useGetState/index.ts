import type { Dispatch, SetStateAction } from 'react';
import { useState, useRef, useCallback } from 'react';
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

type GetStateAction<S> = () => S;

function useGetState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];
function useGetState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  GetStateAction<S | undefined>,
];
function useGetState<S>(initialState?: S) {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);

  useIsomorphicLayoutEffect(() => {
    stateRef.current = state;
  }, [state]);

  const getState = useCallback(() => stateRef.current, []);

  return [state, setState, getState];
}

export default useGetState;
