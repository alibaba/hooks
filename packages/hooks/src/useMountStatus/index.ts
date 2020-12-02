import { useRef, useEffect, useCallback } from 'react';

const useMountStatus = () => {
  const isMounted = useRef(false);
  const getMountState = useCallback(() => isMounted.current, []);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return getMountState;
};

export default useMountStatus;
