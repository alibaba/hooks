import { useEffect, useState } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import useUpdateEffect from '../useUpdateEffect';
import type { RateLimitOptions } from './createRateLimitFn';

type noop = (...args: any[]) => any;

export function createRateLimitEffect<T extends noop>(
  useRateLimitFn: (
    fn: T,
    options?: RateLimitOptions,
  ) => {
    run: T;
    cancel: () => void;
    flush: () => void;
  },
) {
  return function useRateLimitEffect(
    effect: EffectCallback,
    deps?: DependencyList,
    options?: RateLimitOptions,
  ) {
    const [flag, setFlag] = useState({});

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
