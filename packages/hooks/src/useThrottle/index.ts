import { useEffect, useState } from 'react';
import useThrottleFn from '../useThrottleFn';
import type { ThrottleOptions } from './throttleOptions';

function useThrottle<T>(value: T, options?: ThrottleOptions) {
  const [throttled, setThrottled] = useState(value);

  const { run } = useThrottleFn(() => {
    setThrottled(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return throttled;
}

export default useThrottle;
