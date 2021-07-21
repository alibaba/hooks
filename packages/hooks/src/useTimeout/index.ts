import { useEffect } from 'react';
import useLatest from '../useLatest';

function useTimeout(fn: () => void, delay: number | null | undefined): void {
  const fnRef = useLatest(fn);

  useEffect(() => {
    if (delay === undefined || delay === null) return;
    const timer = setTimeout(() => {
      fnRef.current();
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);
}

export default useTimeout;
