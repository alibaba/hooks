import { useMemo, useRef } from 'react';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

type noop = (this: any, ...args: any[]) => any;

function useMemoizedFn<T extends noop>(fn: T) {
  if (isDev && !isFunction(fn)) {
    console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
  }

  const fnRef = useRef({
    originalFn: fn,
    memoizedFn: function (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
      return fnRef.current.originalFn.apply(this, args);
    },
  });
  // why not write `fnRef.current.originalFn = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current.originalFn = useMemo(() => fn, [fn]);

  return fnRef.current.memoizedFn as T;
}

export default useMemoizedFn;
