import { useEffect } from 'react';
import useLatest from '../useLatest';
import { isNumber } from '../utils';

function useInterval(
  fn: () => void,
  delay: number | undefined,
  options?: {
    immediate?: boolean;
  },
) {
  const immediate = options?.immediate;

  const fnRef = useLatest(fn);

  useEffect(() => {
    if (!isNumber(delay) || delay < 0 || isNaN(delay)) {
      console.warn(`delay should be a valid number but get ${delay}`);
      return;
    }

    if (immediate) {
      fnRef.current();
    }
    const timer = setInterval(() => {
      fnRef.current();
    }, delay);
    return () => {
      clearInterval(timer);
    };
  }, [delay]);
}

export default useInterval;
