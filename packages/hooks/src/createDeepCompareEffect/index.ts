import { useRef } from 'react';
import type { DependencyList, useEffect, useLayoutEffect } from 'react';
import isEqual from 'lodash/isEqual';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;
type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;

const depsEqual = (aDeps: DependencyList = [], bDeps: DependencyList = []) => {
  return isEqual(aDeps, bDeps);
};

export const createDeepCompareEffect: CreateUpdateEffect = (hook) => (effect, deps) => {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (deps === undefined || !depsEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current += 1;
  }

  hook(effect, [signalRef.current]);
};
