/* eslint consistent-return: 0 */

import { useLayoutEffect, useRef } from 'react';

const useUpdateLayoutEffect: typeof useLayoutEffect = (effect, deps) => {
  const isMounted = useRef(false);

  useLayoutEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateLayoutEffect;
