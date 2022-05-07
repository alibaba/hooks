import type { DependencyList } from 'react';
import { useEffect } from 'react';
import { isFunction } from '../utils';

function useAsyncEffect(
  effect: () => AsyncGenerator<void, void, void> | Promise<void>,
  deps: DependencyList,
) {
  function isGenerator(
    val: AsyncGenerator<void, void, void> | Promise<void>,
  ): val is AsyncGenerator<void, void, void> {
    return isFunction(val[Symbol.asyncIterator]);
  }
  useEffect(() => {
    const e = effect();
    let cancelled = false;
    async function execute() {
      if (isGenerator(e)) {
        while (true) {
          const result = await e.next();
          if (cancelled || result.done) {
            break;
          }
        }
      } else {
        await e;
      }
    }
    execute();
    return () => {
      cancelled = true;
    };
  }, deps);
}

export default useAsyncEffect;
