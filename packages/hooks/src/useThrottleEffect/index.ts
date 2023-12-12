import { useEffect, useRef } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import type { ThrottleOptions } from '../useThrottle/throttleOptions';
import useThrottleFn from '../useThrottleFn';
import isDev from '../utils/isDev';
import { isFunction } from '../utils';
import useUnmount from '../useUnmount';

function useThrottleEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: ThrottleOptions,
) {
  if (isDev) {
    if (!isFunction(effect)) {
      console.error(
        `useThrottleEffect expected first parameter is a function, got ${typeof effect}`,
      );
    }
  }

  const cleanup = useRef<ReturnType<EffectCallback>>();

  const { run } = useThrottleFn(() => {
    if (isFunction(cleanup.current)) {
      cleanup.current();
    }
    cleanup.current = effect();
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUnmount(() => {
    if (isFunction(cleanup.current)) {
      cleanup.current();
    }
  });
}

export default useThrottleEffect;
