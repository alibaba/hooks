import { useEffect } from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useTimeout(fn: () => void, delay: number | null | undefined): void {
  const timerFn = useMemoizedFn(fn);

  useEffect(() => {
    if (delay === undefined || delay === null) return;
    const timer = setTimeout(() => {
      timerFn();
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, timerFn]);
}

export default useTimeout;
