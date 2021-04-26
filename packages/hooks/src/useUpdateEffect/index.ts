import { useEffect, useRef, EffectCallback, DependencyList } from 'react';

type Deps = DependencyList;

type UseUpdateEffect = (
  effect: (prevDeps?: Deps) => ReturnType<EffectCallback>,
  deps?: Deps,
) => void;

const useUpdateEffect: UseUpdateEffect = (effect, deps) => {
  const isMounted = useRef(false);
  const prevDeps = useRef(deps);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      const destructor = effect(prevDeps.current);
      prevDeps.current = deps;
      return destructor;
    }
  }, deps);
};

export default useUpdateEffect;

