import { useEffect, useRef } from 'react';

const useMount = (fn: any) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    if (fnRef.current && typeof fnRef.current === 'function') {
      fnRef.current();
    }
  }, [])
};

export default useMount;
