import { useRef, useMemo } from 'react';
import type { DependencyList } from 'react';
import isEqual from 'lodash/isEqual';

type MemoHookType = typeof useMemo;
type CreateMemo = (hook: MemoHookType) => MemoHookType;

const depsEqual = (aDeps: DependencyList = [], bDeps: DependencyList = []) => {
  return isEqual(aDeps, bDeps);
};

export const createDeepCompareMemo: CreateMemo = (hook) => (factory, deps) => {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (deps === undefined || !depsEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current += 1;
  }

  return hook(factory, [signalRef.current]);
};

export default createDeepCompareMemo(useMemo);
