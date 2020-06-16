import { useEffect, useRef } from 'react';

const useUnmount = (fn: any) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(()=>{
    return () => {
      if(fnRef.current && typeof fnRef.current === 'function') {
        fnRef.current();
      }
    }
  }, [])
};

export default useUnmount;
