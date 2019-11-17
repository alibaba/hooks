import { DependencyList, useCallback, useEffect, useRef } from 'react';
import useUpdateEffect from '../useUpdateEffect';

type noop = (...args: any[]) => any;

export interface ReturnValue<T extends any[]> {
  run: (...args: T) => void;
  cancel: () => void;
}

function useDebounceFn<T extends any[]>(fn: (...args: T) => any, wait: number): ReturnValue<T>;
function useDebounceFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: DependencyList,
  wait: number,
): ReturnValue<T>;
function useDebounceFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: DependencyList | number,
  wait?: number,
): ReturnValue<T> {
  const _deps: DependencyList = (Array.isArray(deps) ? deps : []) as DependencyList;
  const _wait: number = typeof deps === 'number' ? deps : wait || 0;
  const timer = useRef<any>();

  const fnRef = useRef<noop>(fn);
  fnRef.current = fn;

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const run = useCallback(
    (...args: any) => {
      cancel();
      timer.current = setTimeout(() => {
        fnRef.current(...args);
      }, _wait);
    },
    [_wait, cancel],
  );

  useUpdateEffect(() => {
    run();
    return cancel;
  }, [..._deps, run]);

  useEffect(() => cancel, []);

  return {
    run,
    cancel,
  };
}

export default useDebounceFn;
