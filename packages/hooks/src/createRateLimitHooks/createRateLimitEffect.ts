import { useEffect, useState } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import useUpdateEffect from '../useUpdateEffect';

type noop = (...args: any[]) => any;

export function createRateLimitEffect<T extends noop, Options = any>(
  useRateLimitFn: (
    fn: T,
    options?: Options,
  ) => {
    run: T;
    cancel: () => void;
    flush: () => void;
  },
) {
  return function useRateLimitEffect(
    effect: EffectCallback,
    deps?: DependencyList,
    options?: Options,
  ) {
    const [flag, setFlag] = useState({});

    // Note: The type assertion is safe here because we're creating a zero-argument
    // callback that matches the noop signature. The callback will be called without
    // arguments by the rate-limiting logic.
    const { run } = useRateLimitFn(
      (() => {
        setFlag({});
      }) as T,
      options,
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: deps is intentionally passed through from the user
    useEffect(() => {
      return run();
    }, deps);

    useUpdateEffect(effect, [flag]);
  };
}
