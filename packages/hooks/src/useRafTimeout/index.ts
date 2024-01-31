import { useCallback, useEffect, useRef } from 'react';
import useLatest from '../useLatest';
import { isNumber } from '../utils';
import { clearRafTimeout, setRafTimeout } from '../utils/rafTimer';
import type { Handle } from '../utils/rafTimer';

function useRafTimeout(fn: () => void, delay: number | undefined) {
  const fnRef = useLatest(fn);
  const timerRef = useRef<Handle>();

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) return;
    timerRef.current = setRafTimeout(() => {
      fnRef.current();
    }, delay);
    return () => {
      if (timerRef.current) {
        clearRafTimeout(timerRef.current);
      }
    };
  }, [delay]);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearRafTimeout(timerRef.current);
    }
  }, []);

  return clear;
}

export default useRafTimeout;
