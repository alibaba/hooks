import { getTargetElement } from '../utils/domTarget';
import type { BasicTarget } from '../utils/domTarget';
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
      const observer = new MutationObserver(callback);
      observer.observe(element, options);
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    },
    [callback, options],
    target,
  );
};

export default useMutationObserver;
