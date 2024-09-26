import { useCallback, useEffect, useRef, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import { isNumber } from '../utils';

export interface UseTimeoutOptions {
  defaultActive?: boolean;
}

const useTimeout = (
  fn: () => void,
  delay?: number,
  options?: UseTimeoutOptions,
): {
  clear: () => void;
  start: () => void;
  isActive: boolean;
} => {
  const { defaultActive = true } = options || {};

  const [isActive, setIsActive] = useState(defaultActive);
  const timerCallback = useMemoizedFn(fn);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    setIsActive(true);
    timerRef.current = setTimeout(timerCallback, delay);
  };

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!defaultActive) return;
    if (!isNumber(delay) || delay < 0) return;

    start();

    return clear;
  }, [delay, defaultActive]);

  return { clear, start, isActive };
};

export default useTimeout;
