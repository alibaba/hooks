import React, { useCallback, Dispatch, SetStateAction } from 'react';
import useUnmountedRef from '../useUnmountedRef';

function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

function useSafeState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

function useSafeState<S>(initialState?: S) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = React.useState(initialState);
  const setCurrentState = useCallback(
    (currentState: S) => {
      /** 如果组件已经卸载则不再更新 state */
      if (unmountedRef.current) return;
      setState(currentState);
    },
    [unmountedRef],
  );

  return [state, setCurrentState] as const;
}

export default useSafeState;
