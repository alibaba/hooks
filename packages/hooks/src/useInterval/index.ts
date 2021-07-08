import { useEffect } from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useInterval(
  fn: () => void,
  delay: number | null | undefined,
  options?: {
    immediate?: boolean;
  },
): void {
  const immediate = options?.immediate;

  const memoFn = useMemoizedFn(fn);

  useEffect(() => {
    if (delay === undefined || delay === null) return;
    if (immediate) {
      memoFn();
    }
    const timer = setInterval(() => {
      memoFn();
    }, delay);
    return () => {
      clearInterval(timer);
    };
  }, [delay, memoFn]);
}

export default useInterval;
