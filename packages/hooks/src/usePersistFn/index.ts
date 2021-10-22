import { useRef } from 'react';

export type noop = (...args: any[]) => any;

function usePersistFn<T extends noop>(fn: T) {
  const persistFn = useRef<T>();
  if (!persistFn.current) {
    persistFn.current = function (...args) {
      return fn!.apply(this, args);
    } as T;
  }

  return persistFn.current!;
}

export default usePersistFn;
