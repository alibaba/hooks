import { useEffect } from 'react';

const useMount = (fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error(`useUnmount expected parameter is a function, got ${typeof fn}`);
    }
  }

  useEffect(() => {
    fn();
  }, []);
};

export default useMount;
