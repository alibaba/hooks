import { useRef } from 'react';
import type { DependencyList, useEffect, useLayoutEffect } from 'react';
import { depsEqual } from '../utils/depsEqual';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;

type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;

export const createDeepCompareEffect: CreateUpdateEffect = (hook) => (effect, deps) => {
  const ref = useRef<DependencyList>(undefined);
  const signalRef = useRef<number>(0);
  if (deps === undefined || !depsEqual(deps, ref.current)) {
    signalRef.current += 1;
  }
  ref.current = deps;
  hook(effect, [signalRef.current]);
};
