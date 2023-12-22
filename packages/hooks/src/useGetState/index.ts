import type { Dispatch, SetStateAction } from 'react';
import { useState, useRef, useCallback } from 'react';

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

  const setStateWithRef: Dispatch<SetStateAction<S>> = (newValue) => {
    setState((cur) => {
      const _newValue = typeof newValue === 'function' ? (newValue as any)(cur) : newValue;
      stateRef.current = _newValue as S;
      return _newValue as S;
    });
  };

  const getState = useCallback(() => stateRef.current, []);

  return [state, setStateWithRef, getState];
}

export default useGetState;
