import { useEffect, useRef } from 'react';

function useInterval(
  fn: () => void,
  delay: number | null | undefined,
  options?: {
    immediate?: boolean;
  },
): void {
  const immediate = options?.immediate;

  const fnRef = useRef<() => void>();
  fnRef.current = fn;

  useEffect(() => {
    if (delay === undefined || delay === null) return;
    if (immediate) {
      fnRef.current?.();
    }
    let timer;
    const run = () => {
      timer = setTimeout(() => {
        fnRef.current?.();
        run();
      }, delay);
    };
    run();
    return () => {
      clearTimeout(timer);
    };
  }, [delay, immediate]);
}

export default useInterval;
