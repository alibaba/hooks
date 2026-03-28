import { useMemo } from 'react';
import useLatest from '../useLatest';
import useUnmount from '../useUnmount';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

type noop = (...args: any[]) => any;

export interface RateLimitFunction<T extends noop> {
  (...args: Parameters<T>): ReturnType<T>;
  cancel: () => void;
  flush: () => void;
}

// Base constraint for rate limit options to ensure they have a 'wait' property
interface BaseRateLimitOptions {
  wait?: number;
}

export function createRateLimitFn<
  T extends noop,
  Options extends BaseRateLimitOptions = BaseRateLimitOptions,
>(
  rateLimitFn: (
    func: (...args: Parameters<T>) => ReturnType<T>,
    wait: number,
    options?: Options,
  ) => RateLimitFunction<T>,
  hookName: string,
) {
  return function useRateLimitFn(fn: T, options?: Options) {
    if (isDev) {
      if (!isFunction(fn)) {
        console.error(`${hookName} expected parameter is a function, got ${typeof fn}`);
      }
    }

    const fnRef = useLatest(fn);

    const wait = options?.wait ?? 1000;

    // Note: We intentionally use an empty dependency array here.
    // The rateLimitFn is created once and captures the latest fn via fnRef.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const rateLimited = useMemo(
      () =>
        rateLimitFn(
          (...args: Parameters<T>): ReturnType<T> => {
            return fnRef.current(...args);
          },
          wait,
          options,
        ),
      // biome-ignore lint/correctness/useExhaustiveDependencies: rateLimitFn is stable, fnRef updates are captured via .current
      [],
    );

    useUnmount(() => {
      rateLimited.cancel();
    });

    return {
      run: rateLimited,
      cancel: rateLimited.cancel,
      flush: rateLimited.flush,
    };
  };
}
