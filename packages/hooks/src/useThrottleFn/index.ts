import { DependencyList, useCallback, useEffect, useRef } from 'react';
import useUpdateEffect from '../useUpdateEffect';

type noop = (...args: any[]) => any;

export interface ReturnValue<T extends any[]> {
  run: (...args: T) => void;
  cancel: () => void;
}

function useThrottleFn<T extends any[]>(fn: (...args: T) => any, wait: number): ReturnValue<T>;
function useThrottleFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: DependencyList,
  wait: number,
): ReturnValue<T>;
function useThrottleFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: DependencyList | number,
  wait?: number,
): ReturnValue<T> {
  const _deps: DependencyList = (Array.isArray(deps) ? deps : []) as DependencyList;
  const _wait: number = typeof deps === 'number' ? deps : wait || 0;
  const timer = useRef<any>();

  const fnRef = useRef<noop>(fn);
  fnRef.current = fn;

  const currentArgs = useRef<any>([]);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = undefined;
  }, []);

  const run = useCallback(
    (...args: any) => {
      currentArgs.current = args;
      if (!timer.current) {
        timer.current = setTimeout(() => {
          fnRef.current(...currentArgs.current);
          timer.current = undefined;
        }, _wait);
      }
    },
    [_wait, cancel],
  );

  useUpdateEffect(() => {
    run();
  }, [..._deps, run]);

  useEffect(() => cancel, []);

  return {
    run,
    cancel,
  };
}

export default useThrottleFn;
