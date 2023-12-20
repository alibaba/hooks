import { useEffect, useRef } from 'react';

/**
 * A Hook can be used to get whether the component is unmounted.
 * @see https://ahooks.js.org/hooks/lifecycle/use-unmounted-ref
 */
const useUnmountedRef = () => {
  const unmountedRef = useRef(false);
  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
};

export default useUnmountedRef;
