import { useState } from 'react';
import useThrottleFn from '../useThrottleFn';

function useThrottle<T>(value: T, wait: number) {
  const [state, setState] = useState(value);

  useThrottleFn(
    () => {
      setState(value);
    },
    [value],
    wait,
  );

  return state;
}

export default useThrottle;
