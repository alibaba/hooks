import { getTargetElement } from '../utils/domTarget';
import type { BasicTarget } from '../utils/domTarget';
import { errorMessage1, errorMessage2, errorMessage3 } from './error';
import useIsomorphicLayoutEffectWithTarget from '../utils/useIsomorphicLayoutEffectWithTarget';

const useMutationObserver = (
  target: BasicTarget,
  callback: MutationCallback,
  options?: MutationObserverInit,
): void => {
  useIsomorphicLayoutEffectWithTarget(
    () => {
      const element = getTargetElement(target);
      if (!element) {
        return;
      }
      // https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe#%E5%BC%82%E5%B8%B8
      if (!options?.attributes && !options?.characterData && !options?.childList) {
        console.error(errorMessage1);
        return;
      }
      if (!options?.attributes && options?.attributeOldValue) {
        console.error(errorMessage2);
        return;
      }
      if (options?.characterDataOldValue && !options?.characterData) {
        console.error(errorMessage3);
        return;
      }
      const observer = new MutationObserver(callback);
      observer.observe(element, options);
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    },
    [],
    target,
  );
};

export default useMutationObserver;
