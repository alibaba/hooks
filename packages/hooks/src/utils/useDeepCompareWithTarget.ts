import isEqual from 'lodash/isEqual';
import type { DependencyList, EffectCallback } from 'react';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';
import type { BasicTarget } from './domTarget';
import useEffectWithTarget from './useEffectWithTarget';

const depsEqual = (aDeps: DependencyList, bDeps: DependencyList = []) => {
  return isEqual(aDeps, bDeps);
};

const useDeepCompareEffectWithTarget = (
  effect: EffectCallback,
  deps: DependencyList,
  target: BasicTarget<any> | BasicTarget<any>[],
) => {
  const ref = useRef<DependencyList>(deps);
  const signalRef = useRef<number>(0);

  useIsomorphicLayoutEffect(() => {
    if (!depsEqual(deps, ref.current)) {
      ref.current = deps;
      signalRef.current += 1;
    }
  });

  useEffectWithTarget(effect, [signalRef.current], target);
};

export default useDeepCompareEffectWithTarget;
