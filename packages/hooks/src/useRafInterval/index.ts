import { useCallback, useEffect, useRef } from 'react';
import useLatest from '../useLatest';
import { isNumber } from '../utils';
import { clearRafInterval, setRafInterval, type Handle } from '../utils/rafTimer';

function useRafInterval(
  fn: () => void,
  delay: number | undefined,
  options?: {
    immediate?: boolean;
  },
) {
  const immediate = options?.immediate;

  const fnRef = useLatest(fn);
  const timerRef = useRef<Handle>();

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) return;
    if (immediate) {
      fnRef.current();
    }
    timerRef.current = setRafInterval(() => {
      fnRef.current();
    }, delay);
    return () => {
      if (timerRef.current) {
        clearRafInterval(timerRef.current);
      }
    };
  }, [delay]);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearRafInterval(timerRef.current);
    }
  }, []);

  return clear;
}

export default useRafInterval;
