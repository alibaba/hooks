import { useEffect, useRef } from 'react';

function useInterval(
  fn: () => void,
  interval: number,
  options?: {
    immediate?: boolean;
  },
): void {
  const immediate = options?.immediate;
  const timerRef = useRef<() => void>();

  timerRef.current = fn;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (typeof interval !== 'undefined' || interval !== null) {
      if (immediate) {
        timerRef?.current();
      }
      timer = setInterval(() => {
        timerRef?.current();
      }, interval);
    }
    return () => {
      clearInterval(timer);
    };
  }, [interval]);
}

export default useInterval;
