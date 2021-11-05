import type { DependencyList, EffectCallback, useEffect, useLayoutEffect } from 'react';
import { useRef } from 'react';
import useUnmount from '../useUnmount';
import depsAreSame from './depsAreSame';
import type { BasicTarget } from './domTarget';
import { getTargetElement } from './domTarget';

const createEffectWithTarget = (useEffectType: typeof useEffect | typeof useLayoutEffect) => {
  const useEffectWithTarget = (
    effect: EffectCallback,
    deps: DependencyList,
    target: BasicTarget<any> | BasicTarget<any>[],
  ) => {
    const hasInitRef = useRef(false);

    const lastElementRef = useRef<(Element | null)[]>([]);
    const lastDepsRef = useRef<DependencyList>([]);

    const unLoadRef = useRef<any>();

    useEffectType(() => {
      const targets = Array.isArray(target) ? target : [target];
      const els = targets.map((item) => getTargetElement(item));

      // init run
      if (!hasInitRef.current) {
        hasInitRef.current = true;
        lastElementRef.current = els;
        lastDepsRef.current = deps;

        unLoadRef.current = effect();
      }

      if (
        els.length !== lastElementRef.current.length ||
        !depsAreSame(els, lastElementRef.current) ||
        !depsAreSame(deps, lastDepsRef.current)
      ) {
        unLoadRef.current?.();

        lastElementRef.current = els;
        lastDepsRef.current = deps;
        unLoadRef.current = effect();
      }
    });

    useUnmount(() => {
      unLoadRef.current?.();
    });
  };

  return useEffectWithTarget;
};

export default createEffectWithTarget;
