import { useEffect } from 'react';
import useLatest from '../useLatest';
import { isNumber } from '../utils';

function useTimeout(fn: () => void, delay: number | undefined): void {
  const fnRef = useLatest(fn);

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) {
      return;
    }

    const timer = setTimeout(() => {
      fnRef.current();
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);
}

export default useTimeout;
