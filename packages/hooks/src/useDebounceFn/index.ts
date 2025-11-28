import { debounce } from '../utils/lodash-polyfill';
import { useMemo } from 'react';
import type { DebounceOptions } from '../useDebounce/debounceOptions';
import useLatest from '../useLatest';
import useUnmount from '../useUnmount';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

type noop = (...args: any[]) => any;

export interface DebouncedFn<T extends noop> {
  run: ((...args: Parameters<T>) => ReturnType<T> | undefined) & {
    cancel: () => void;
    flush: () => ReturnType<T> | undefined;
  };
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
}

function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions): DebouncedFn<T> {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useDebounceFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options,
      ),
    [],
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}

export default useDebounceFn;
