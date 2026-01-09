import { useEffect, useState } from 'react';

type noop = (...args: any[]) => any;

export function createRateLimitValue<T extends noop, Options = any>(
  useRateLimitFn: (
    fn: T,
    options?: Options,
  ) => {
    run: T;
    cancel: () => void;
    flush: () => void;
  },
) {
  return function useRateLimitValue<V>(value: V, options?: Options) {
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
