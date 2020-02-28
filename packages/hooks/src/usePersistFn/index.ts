import { useRef, useEffect, DependencyList, useCallback } from 'react';

export type noop = (...args: any[]) => any;

function usePersistFn<T extends noop>(fn: T, dependencies: DependencyList) {
  const ref = useRef<any>(() => {
    throw new Error('Cannot call function while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  const persistFn = useCallback(((...args) => ref.current(...args)) as T, [ref]);

  return persistFn;
}

export default usePersistFn;
