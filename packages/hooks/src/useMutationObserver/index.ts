import { getTargetElement } from '../utils/domTarget';
import type { BasicTarget } from '../utils/domTarget';
import useDeepCompareEffectWithTarget from '../utils/useDeepCompareWithTarget';
import useLatest from '../useLatest';

/**
 * A hook that provides the ability to watch for changes being made to the DOM tree, refer to [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
 * @see https://ahooks.js.org/hooks/use-mutation-observer
 */
const useMutationObserver = (
  callback: MutationCallback,
  target: BasicTarget,
  options: MutationObserverInit = {},
): void => {
  const callbackRef = useLatest(callback);

  useDeepCompareEffectWithTarget(
    () => {
      const element = getTargetElement(target);
      if (!element) {
        return;
      }
      const observer = new MutationObserver(callbackRef.current);
      observer.observe(element, options);
      return () => {
        observer?.disconnect();
      };
    },
    [options],
    target,
  );
};

export default useMutationObserver;
