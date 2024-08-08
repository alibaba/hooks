import type { Dispatch, SetStateAction } from 'react';
import { useRef, useState, useCallback } from "react";
import { isFunction } from '../utils';

type GetStateAction<S> = () => S;

function useRefState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];
function useRefState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  GetStateAction<S | undefined>,
];
function useRefState<S>(value?: S) {
  const [state, setState] = useState(value);
  const stateRef = useRef(state);

  const setRefState = useCallback((patch: S | ((state?: S) => S)) => {
    const newState = isFunction(patch) ? patch(stateRef.current) : patch;
    stateRef.current = newState;
    setState(newState);
  }, [])

  const getState = useCallback(() => stateRef.current, []);
  return [state, setRefState, getState] as const;
}

export default useRefState;
