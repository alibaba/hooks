import { useRef, useEffect } from 'react';

const useUnmountedRef = () => {
  const unmountRef = useRef(true);
  useEffect(() => {
    unmountRef.current = false;
    return () => {
      unmountRef.current = true;
    };
  }, []);
  return unmountRef;
};

export default useUnmountedRef;
