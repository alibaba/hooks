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
      const { attributes, characterData, childList, attributeOldValue, characterDataOldValue } =
        options ?? {};
      // https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe#%E5%BC%82%E5%B8%B8
      if (!attributes && !characterData && !childList) {
        if (process.env.NODE_ENV === 'development') {
          console.error(
            `[useMutationObserver]: The options object must set at least one of 'attributes', 'characterData', or 'childList' to true.`,
          );
        }
        return;
      }
      if (!attributes && attributeOldValue) {
        if (process.env.NODE_ENV === 'development') {
          console.error(
            `[useMutationObserver]: The options object may only set 'attributeOldValue' to true when 'attributes' is true or not present.`,
          );
        }
        return;
      }
      if (characterDataOldValue && !characterData) {
        if (process.env.NODE_ENV === 'development') {
          console.error(
            `[useMutationObserver]: The options object may only set 'characterDataOldValue' to true when 'characterData' is true or not present.`,
          );
        }
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
