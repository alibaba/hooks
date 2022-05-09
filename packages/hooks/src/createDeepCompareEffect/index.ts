import { useRef } from 'react';
import type { DependencyList, EffectCallback, useEffect, useLayoutEffect } from 'react';
import isEqual from 'lodash/isEqual';

type effectHookType = typeof useEffect | typeof useLayoutEffect;
type ICreateUpdateEffect = (
  hook: effectHookType,
) => (effect: EffectCallback, deps: DependencyList) => void;

const depsEqual = (aDeps: DependencyList, bDeps: DependencyList = []) => {
  return isEqual(aDeps, bDeps);
};

export const createDeepCompareEffect: ICreateUpdateEffect = (hook) => (effect, deps) => {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (!depsEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current += 1;
  }

  hook(effect, [signalRef.current]);
};
