import type { Dispatch } from 'react';
import { useState, useRef, useCallback } from 'react';
import { isFunction } from '../utils';

type SetStateAction<S> = Dispatch<React.SetStateAction<S>>;
type GetStateAction<S> = () => S;

function useGetState<S>(initialState: S | (() => S)): [S, SetStateAction<S>, GetStateAction<S>];
function useGetState<S = undefined>(): [
  S | undefined,
  SetStateAction<S | undefined>,
  GetStateAction<S | undefined>,
];
function useGetState<S>(initialState?: S) {
  const [state, setInnerState] = useState(initialState);
  const stateRef = useRef(state);

  const setState = useCallback<SetStateAction<S | undefined>>((stateOrAction) => {
    const newState = isFunction(stateOrAction) ? stateOrAction(stateRef.current) : stateOrAction;

    stateRef.current = newState;
    setInnerState(newState);
  }, []);

  const getState = useCallback(() => stateRef.current, []);

  return [state, setState, getState];
}

export default useGetState;
