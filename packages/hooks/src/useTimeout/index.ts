import { useEffect, useRef } from 'react';

function useTimeout(fn: () => void, delay: number | null | undefined): void {
  const timerRef = useRef<() => void>();

  timerRef.current = fn;

  useEffect(() => {
    if (delay === undefined || delay === null) return;
    const timer = setTimeout(() => {
      timerRef.current?.();
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);
}

export default useTimeout;
