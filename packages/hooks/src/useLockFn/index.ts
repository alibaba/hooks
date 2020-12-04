import { useRef } from 'react';
import usePersistFn from '../usePersistFn';

function useLockFn<P extends any[] = any[], V extends any = any>(fn: (...args: P) => Promise<V>) {
  const lockRef = useRef(false);

  return usePersistFn(async function (...args: P) {
    if (lockRef.current) return;
    lockRef.current = true;
    try {
      const ret = await fn(...args);
      lockRef.current = false;
      return ret;
    } catch (e) {
      lockRef.current = false;
      throw e;
    }
  });
}

export default useLockFn;
