import { useRef, type EffectCallback, type DependencyList } from "react";

type Cleanup = ReturnType<EffectCallback>;

const useImmediateEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const prevDepsRef = useRef<DependencyList | undefined>(undefined);
  const prevCleanupRef = useRef<Cleanup | undefined>(undefined);
  if (isDepsChanged(prevDepsRef.current, deps)) {
    prevCleanupRef.current?.();
    prevCleanupRef.current = effect();
  }
  prevDepsRef.current = deps;
};

export default useImmediateEffect;

const isDepsChanged = (
  prevDeps: DependencyList | undefined,
  deps: DependencyList | undefined
) => {
  if (
    prevDeps instanceof Array &&
    deps instanceof Array &&
    prevDeps.length === deps.length
  ) {
    for (let i = 0; i !== prevDeps.length; ++i) {
      if (!Object.is(prevDeps[i], deps[i])) {
        return true;
      }
    }
    return false;
  } else {
    return true;
  }
};
