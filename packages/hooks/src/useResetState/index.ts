import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useMemoizedFn from '../useMemoizedFn';

type ResetState = () => void;

/**
 * `useResetState` works similar to `React.useState`, it provides a `reset` method
 * @see https://ahooks.js.org/hooks/use-reset-state
 */
const useResetState = <S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, ResetState] => {
  const [state, setState] = useState(initialState);

  const resetState = useMemoizedFn(() => {
    setState(initialState);
  });

  return [state, setState, resetState];
};

export default useResetState;
