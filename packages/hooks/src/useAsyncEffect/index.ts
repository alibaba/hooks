import type { DependencyList } from 'react';
import { useEffect } from 'react';
import { isFunction } from '../utils';

function isAsyncGenerator(
  val: AsyncGenerator<void, void, void> | Promise<void>,
): val is AsyncGenerator<void, void, void> {
  return isFunction((val as any)[Symbol.asyncIterator]);
}

function useAsyncEffect(
  effect: () => AsyncGenerator<void, void, void> | Promise<void> | (() => void),
  deps?: DependencyList,
) {
  useEffect(() => {
    const e = effect();
    if (typeof e === 'function') {
      return e;
    }
    const asyncEffect = e;
    let cancelled = false;
    async function execute() {
      if (isAsyncGenerator(asyncEffect)) {
        while (true) {
          const result = await asyncEffect.next();
          if (result.done || cancelled) {
            break;
          }
        }
      } else {
        await asyncEffect;
      }
    }
    execute();
    return () => {
      cancelled = true;
    };
  }, deps);
}

export default useAsyncEffect;
