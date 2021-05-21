import { useEffect, DependencyList } from 'react';

type CleanUpWith = (cleanUp: () => void) => void;

function useAsyncEffect(effect: (cleanUpWith: CleanUpWith) => Promise<void>, deps: DependencyList) {
  useEffect(() => {
    const cleanUpContainer = {
      current: null as (() => void) | null,
    };
    function cleanUpWith(fn: () => void) {
      cleanUpContainer.current = fn;
    }
    (async function () {
      await effect(cleanUpWith);
    })();
    return () => {
      cleanUpContainer.current?.();
    };
  }, deps);
}

export default useAsyncEffect;
