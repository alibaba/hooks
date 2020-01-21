import { useCallback, useRef, useEffect } from "react";

function usePersistFn(fn: any, dependencies: any = []) {
  const ref = useRef<any>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  const persist = useCallback((...args) => {
    const fn = ref.current;
    if (fn) {
      return fn(...args);
    }
  }, [ref]);

  if (typeof fn === 'function') {
    return persist;
  } else {
    return undefined;
  }
}

export default usePersistFn;