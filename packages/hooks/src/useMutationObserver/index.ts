import { getTargetElement } from '../utils/domTarget';
import type { BasicTarget } from '../utils/domTarget';
import useDeepCompareEffectWithTarget from '../utils/useDeepCompareWithTarget';

const useMutationObserver = (
  target: BasicTarget,
  callback: MutationCallback,
  options: MutationObserverInit = {},
): void => {
  useDeepCompareEffectWithTarget(
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
    [options, callback],
    target,
  );
};

export default useMutationObserver;
