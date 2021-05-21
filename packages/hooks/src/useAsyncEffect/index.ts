import { useEffect, DependencyList } from 'react';

type CleanUpWith = (cleanUp: () => void) => void;

function useAsyncEffect(effect: (cleanUpWith: CleanUpWith) => Promise<void>, deps: DependencyList) {
  useEffect(() => {
    let cleanUp: () => void;
    function cleanUpWith(fn: () => void) {
      cleanUp = fn;
    }
    (async function () {
      await effect(cleanUpWith);
    })();
    return () => {
      cleanUp?.();
    };
  }, deps);
}

export default useAsyncEffect;
