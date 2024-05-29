import { useCallback, useEffect, useRef } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import { isNumber } from '../utils';

export interface UseTimeoutOptions {
  defaultActive?: boolean;
}

const useTimeout = (fn: () => void, delay?: number, options?: UseTimeoutOptions) => {
  const { defaultActive = true } = options || {};

  const timerCallback = useMemoizedFn(fn);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!defaultActive) return;

    if (!isNumber(delay) || delay < 0) {
      return;
    }

    timerRef.current = setTimeout(timerCallback, delay);
    return clear;
  }, [delay, defaultActive]);

  return clear;
};

// const {
//   start,
//   pause,
//   clear,
//   isActive,
// } = useTimeout(fn, delay, {
//   defaultActive: false
// })

export default useTimeout;
