import type { DependencyList } from 'react';
import { useMemo } from 'react';

interface Undone {
  done: false;
}

interface Done<R> {
  done: true;
  result: R;
}

type Lazy<R> = Undone | Done<R>;

function useLazy<T>(callback: () => T, deps: DependencyList): () => T {
  return useMemo(() => {
    let lazy: Lazy<T> = { done: false };
    return () => {
      if (!lazy.done) lazy = { done: true, result: callback() };
      return lazy.result;
    };
  }, deps);
}

export default useLazy;
