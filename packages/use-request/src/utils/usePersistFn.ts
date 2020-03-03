import { useCallback, useRef, useEffect } from 'react';

function usePersistFn(fn: any, dependencies: any = []) {
  const ref = useRef<any>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  const persist = useCallback((...args) => {
    const refFn = ref.current;
    if (refFn) {
      return refFn(...args);
    }
  }, [ref]);

  if (typeof fn === 'function') {
    return persist;
  }
  return undefined;
}

export default usePersistFn;
