import type { DependencyList, EffectCallback } from 'react';
import { useRef } from 'react';
import type { BasicTarget } from './domTarget';
import useEffectWithTarget from './useEffectWithTarget';
import { depsEqual } from './depsEqual';

const useDeepCompareEffectWithTarget = (
  effect: EffectCallback,
  deps: DependencyList,
  target: BasicTarget<any> | BasicTarget<any>[],
) => {
  const ref = useRef<DependencyList>(undefined);
  const signalRef = useRef<number>(0);

  if (!depsEqual(deps, ref.current)) {
    signalRef.current += 1;
  }
  ref.current = deps;

  useEffectWithTarget(effect, [signalRef.current], target);
};

export default useDeepCompareEffectWithTarget;
