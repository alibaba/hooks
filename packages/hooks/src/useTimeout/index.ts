import { useEffect } from 'react';
import usePersistFn from '../usePersistFn';

function useTimeout(fn: () => void, delay: number | null | undefined): void {
  const timerFn = usePersistFn(fn);

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
