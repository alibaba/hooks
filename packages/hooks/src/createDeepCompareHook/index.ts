import { DependencyList, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import isEqual from 'lodash/isEqual';

type MemoHookType = typeof useMemo;
type EffectHookType = typeof useEffect | typeof useLayoutEffect;

export const depsEqual = (aDeps: DependencyList = [], bDeps: DependencyList = []) => {
  return isEqual(aDeps, bDeps);
};

function createDeepCompareHook(hook: MemoHookType): MemoHookType;
function createDeepCompareHook(hook: EffectHookType): EffectHookType;
function createDeepCompareHook(hook: EffectHookType | MemoHookType) {
  return (callback, deps) => {
    const ref = useRef<DependencyList>();
    const signalRef = useRef<number>(0);
    if (deps === undefined || !depsEqual(deps, ref.current)) {
      ref.current = deps;
      signalRef.current += 1;
    }
    return hook(callback, [signalRef.current]);
  };
}

export { createDeepCompareHook };
