import { useCallback, useRef } from 'react';

type noop = (...args: any[]) => any;

function useLimitFn<T extends any[]>(
  fn: (...args: T) => any,
  timespan: number,
): noop {
  const pending = useRef(false);
  const fnRef = useRef<noop>(fn);
  fnRef.current = fn;

  const run = useCallback((...args: any[]) => {
    if (pending.current) {
      return;
    }
    pending.current = true;
    fnRef.current(...args);
    setTimeout(() => {
      pending.current = false;
    }, timespan);
  }, [timespan]);

  return run;
}

export default useLimitFn;
