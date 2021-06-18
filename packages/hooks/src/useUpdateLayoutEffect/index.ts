import { useLayoutEffect, useRef } from 'react';

const useUpdateLayoutEffect: typeof useLayoutEffect = (effect, deps) => {
  const isMounted = useRef(false);

  // for react-refresh
  useLayoutEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdateLayoutEffect;
