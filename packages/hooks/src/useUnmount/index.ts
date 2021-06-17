import { useEffect } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import { isFunction } from '../utils';

const useUnmount = (fn: any) => {
  const fnPersist = useMemoizedFn(fn);

  useEffect(
    () => () => {
      if (isFunction(fnPersist)) {
        fnPersist();
      }
    },
    [],
  );
};

export default useUnmount;
