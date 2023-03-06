import { useCallback, useEffect, useRef } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import { isNumber } from '../utils';

function useInterval(
  fn: () => void,
  delay: number | undefined,
  options: {
    immediate?: boolean;
  } = {},
) {
  const { immediate } = options;

  const timerCallback = useMemoizedFn(fn);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) {
      return;
    }
    if (immediate) {
      timerCallback();
    }
    timerRef.current = setInterval(timerCallback, delay);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [delay, timerCallback]);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  return clear;
}

export default useInterval;
