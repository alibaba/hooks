import { useCallback, useRef } from 'react';

function usePersistFn(fn: any) {
  const ref = useRef<any>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  ref.current = fn;

  const persist = useCallback(
    (...args) => {
      const refFn = ref.current;
      if (refFn) {
        return refFn(...args);
      }
    },
    [ref],
  );

  if (typeof fn === 'function') {
    return persist;
  }
  return undefined;
}

export default usePersistFn;
