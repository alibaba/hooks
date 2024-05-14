import { useCallback, useEffect, useRef } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import { isNumber } from '../utils';

const useInterval = (fn: () => void, delay?: number, options: { immediate?: boolean } = {}) => {
  const timerCallback = useMemoizedFn(fn);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) {
      return;
    }
    if (options.immediate) {
      timerCallback();
    }
    timerRef.current = setInterval(timerCallback, delay);
    return clear;
  }, [delay, options.immediate]);

  return clear;
};

export default useInterval;
