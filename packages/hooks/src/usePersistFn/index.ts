import { useMemo, useRef } from 'react';

type noop = (...args: any[]) => any;

function usePersistFn<T extends noop>(fn: T) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error('usePersistFn expected parameter is a function, got ' + typeof fn);
    }
  }

  const fnRef = useRef<T>(fn);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);

  const persistFn = useRef<T>();
  if (!persistFn.current) {
    persistFn.current = function (...args) {
      return fnRef.current.apply(this, args);
    } as T;
  }

  return persistFn.current;
}

export default usePersistFn;
