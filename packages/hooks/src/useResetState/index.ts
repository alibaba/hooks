import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import { isFunction } from '../utils';
import useCreation from '../useCreation';

type ResetState = () => void;

const useResetState = <S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, ResetState] => {
  const initialStateMemo = useCreation(
    () => (isFunction(initialState) ? initialState() : initialState),
    [],
  );

  const [state, setState] = useState(initialStateMemo);

  const resetState = useMemoizedFn(() => {
    setState(initialStateMemo);
  });

  return [state, setState, resetState];
};

export default useResetState;
