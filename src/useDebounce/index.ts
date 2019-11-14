import { DependencyList, useCallback, useEffect, useRef } from 'react';
import useUpdateEffect from '../useUpdateEffect';

type noop = (...args: any[]) => any;

export interface ReturnValue {
  run: (...args: any[]) => void;
  cancel: () => void;
}

function useDebounce(fn: noop, wait: number): ReturnValue;
function useDebounce(fn: noop, deps: DependencyList, wait: number): ReturnValue;
function useDebounce(fn: noop, deps: DependencyList | number, wait?: number): ReturnValue {
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

export default useDebounce;
