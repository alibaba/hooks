import { useRef, useCallback } from 'react';

function useLockFn<P extends any[] = any[], V = any>(fn: (...args: P) => Promise<V>) {
  const lockRef = useRef(false);

  return useCallback(
    async (...args: P) => {
      if (lockRef.current) {
        return;
      }
      lockRef.current = true;
      try {
        const ret = await fn(...args);
        return ret;
      } catch (e) {
        throw e;
      } finally {
        lockRef.current = false;
      }
    },
    [fn],
  );
}

export default useLockFn;
