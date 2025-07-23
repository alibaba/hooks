import { useEffect, useRef } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import type { DebounceOptions } from '../useDebounce/debounceOptions';
import useDebounceFn from '../useDebounceFn';
import { isFunction } from '../utils';
import useUnmount from '../useUnmount';
import isDev from '../utils/isDev';

function useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: DebounceOptions,
) {
  if (isDev) {
    if (!isFunction(effect)) {
      console.error(
        `useDebounceEffect expected first parameter is a function, got ${typeof effect}`,
      );
    }
  }

  const cleanup = useRef<ReturnType<EffectCallback>>();

  const { run } = useDebounceFn(() => {
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

export default useDebounceEffect;
