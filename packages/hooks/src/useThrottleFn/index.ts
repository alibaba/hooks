import throttle from 'lodash-es/throttle';
import { useMemo } from 'react';
import useLatest from '../useLatest';
import type { ThrottleOptions } from '../useThrottle/throttleOptions';
import useUnmount from '../useUnmount';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

type noop = (...args: any[]) => any;

export interface ThrottledFn<T extends noop> {
  run: ((...args: Parameters<T>) => ReturnType<T> | undefined) & {
    cancel: () => void;
    flush: () => ReturnType<T> | undefined;
  };
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
}

function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions): ThrottledFn<T> {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useThrottleFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const throttled = useMemo(
    () =>
      throttle(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options,
      ),
    [],
  );

  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
}

export default useThrottleFn;
