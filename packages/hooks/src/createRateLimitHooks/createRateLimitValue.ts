import { useEffect, useState } from 'react';
import type { RateLimitOptions } from './createRateLimitFn';

type noop = (...args: any[]) => any;

export function createRateLimitValue<T extends noop>(
  useRateLimitFn: (
    fn: T,
    options?: RateLimitOptions,
  ) => {
    run: T;
    cancel: () => void;
    flush: () => void;
  },
) {
  return function useRateLimitValue<V>(value: V, options?: RateLimitOptions) {
    const [rateLimited, setRateLimited] = useState(value);

    const { run } = useRateLimitFn(
      (() => {
        setRateLimited(value);
      }) as T,
      options,
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: run is stable, we only want to trigger on value changes
    useEffect(() => {
      run();
    }, [value]);

    return rateLimited;
  };
}
