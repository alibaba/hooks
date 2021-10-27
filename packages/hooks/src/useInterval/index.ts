import { useEffect } from 'react';
import useLatest from '../useLatest';

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
    if (typeof delay !== 'number' || delay <= 0) return;
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
