import { useEffect, useRef, EffectCallback, DependencyList } from 'react';

type Deps = DependencyList;

type useDidUpdateEffect = (
  effect: (prevDeps: Deps | undefined) => ReturnType<EffectCallback>,
  deps?: Deps,
) => void;

const useDidUpdateEffect: useDidUpdateEffect = (effect, deps) => {
  const isMounted = useRef(false);
  const prevDeps = useRef(deps);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      const destructor = effect(prevDeps.current);
      prevDeps.current = deps;
      // handle unmount
      return destructor;
    }
  }, deps);
};

export default useDidUpdateEffect;
