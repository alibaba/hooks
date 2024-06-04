import { useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { isFunction } from '../utils';
import useMemoizedFn from '../useMemoizedFn';
import useCreation from '../useCreation';

type ResetState = () => void;

const useResetState = <S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, ResetState] => {
  const initialStateRef = useRef(initialState);
  const initialStateMemo = useCreation(
    () =>
      isFunction(initialStateRef.current) ? initialStateRef.current() : initialStateRef.current,
    [],
  );

  const [state, setState] = useState(initialStateMemo);

  const resetState = useMemoizedFn(() => {
    setState(initialStateMemo);
  });

  return [state, setState, resetState];
};

export default useResetState;
