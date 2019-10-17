import { useEffect, useRef } from 'react';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      return;
    }
    effect();
  }, deps);
};

export default useUpdateEffect;