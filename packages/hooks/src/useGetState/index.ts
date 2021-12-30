import { useState, useRef, useCallback, Dispatch, SetStateAction } from 'react';

type GetState<S> = () => S;

function useGetState<S = undefined>(initialState?: S | (() => S)): [S, Dispatch<SetStateAction<S>>, GetState<S>] {
  const [state, setState] = useState<S>(initialState as S);
  const stateRef = useRef<S>(state);
  stateRef.current = state;

  const getState = useCallback<GetState<S>>(() => stateRef.current, []);

  return [state, setState, getState];
}

export default useGetState;
