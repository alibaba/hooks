import { useRef } from 'react';
import type { DependencyList, useEffect, useLayoutEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { depsEqual } from '../utils/depsEqual';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;
type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;

export const createDeepCompareEffect: CreateUpdateEffect = (hook) => (effect, deps) => {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (deps === undefined || !depsEqual(deps, ref.current)) {
    ref.current = cloneDeep(deps);
    signalRef.current += 1;
  }

  hook(effect, [signalRef.current]);
};
