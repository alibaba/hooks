import { useEffect, useRef } from 'react';
import { isFunction } from '../utils';

const useMount = (fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    if (!isFunction(fn)) {
      console.error(
        `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`,
      );
    }
  }

  const executedRef = useRef(false);

  useEffect(() => {
    if (!executedRef.current) {
      fn?.();
      executedRef.current = true;
    }
  }, []);
};

export default useMount;
