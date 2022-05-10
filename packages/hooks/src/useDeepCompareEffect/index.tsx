import isEqual from 'lodash/isEqual';
import { useEffect, useRef } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

const depsEqual = (aDeps: DependencyList, bDeps: DependencyList = []) => {
  return isEqual(aDeps, bDeps);
};

const useDeepCompareEffect = (effect: EffectCallback, deps: DependencyList) => {
  const ref = useRef<DependencyList>(deps);
  const signalRef = useRef<number>(0);

  useIsomorphicLayoutEffect(() => {
    if (!depsEqual(deps, ref.current)) {
      ref.current = deps;
      signalRef.current += 1;
    }
  });

  useEffect(effect, [signalRef.current]);
};

export default useDeepCompareEffect;
