import { useCallback, useState } from 'react';
import { isFunction } from '../utils';

const useSetState = <T extends object>(
  initialState: T = {} as T,
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void, () => void] => {
  const [state, setState] = useState<T>(initialState);

  const setMergeState = useCallback((patch) => {
    setState((prevState) => ({ ...prevState, ...(isFunction(patch) ? patch(prevState) : patch) }));
  }, []);

  const reset = () => {
    setState({ ...initialState });
  };

  return [state, setMergeState, reset];
};

export default useSetState;
