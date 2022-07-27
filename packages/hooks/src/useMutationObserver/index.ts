import { useEffect } from 'react';
import { getTargetElement } from '../utils/domTarget';
import type { BasicTarget } from '../utils/domTarget';

const useMutationObserver = (
  target: BasicTarget,
  callback: MutationCallback,
  options?: MutationObserverInit,
): void => {
  useEffect(() => {
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
  }, [options, callback]);
};

export default useMutationObserver;
