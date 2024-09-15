import type { DependencyList } from 'react';
import { useRef } from 'react';
import depsAreSame from '../utils/depsAreSame';
import { depsEqual } from '../utils/depsEqual';

type TOptions = {
  isDeepComparison?: boolean;
};

export default function useCreation<T>(factory: () => T, deps: DependencyList, options?: TOptions) {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });

  const compare = options?.isDeepComparison ? depsEqual : depsAreSame;

  if (current.initialized === false || !compare(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj as T;
}
