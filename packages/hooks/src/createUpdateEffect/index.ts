import { useRef } from 'react';

export const createUpdateEffect = (hook) => (effect, deps?) => {
  const isMounted = useRef(false);

  // for react-refresh
  hook(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  hook(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};
