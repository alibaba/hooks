import { useCallback, useEffect, useRef } from 'react';
import useLatest from '../useLatest';
import { isNumber } from '../utils';

function useTimeout(fn: () => void, delay: number | undefined) {
  const fnRef = useLatest(fn);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) {
      return;
    }
    timerRef.current = setTimeout(() => {
      fnRef.current();
    }, delay);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [delay]);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  return clear;
}

export default useTimeout;
