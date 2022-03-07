import { useEffect } from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useInterval(
  fn: () => void,
  delay: number | undefined,
  options?: {
    immediate?: boolean;
  },
) {
  const immediate = options?.immediate;

  const memoFn = useMemoizedFn(fn);

  useEffect(() => {
    if (typeof delay !== 'number' || delay < 0) return;
    if (immediate) {
      memoFn();
    }
    const timer = setInterval(() => {
      memoFn();
    }, delay);
    return () => {
      clearInterval(timer);
    };
  }, [delay]);
}

export default useInterval;
