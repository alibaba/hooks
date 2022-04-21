import { useEffect, useMemo } from 'react';
import type { MutableRefObject } from 'react';
import { getTargetElement } from '../utils/domTarget';

function useMutationObserver(
  target: Element | (() => Element) | MutableRefObject<Element>,
  callback: MutationCallback,
  options?: MutationObserverInit, // pass through a default object if none are present
) {
  const mutationObserver = useMemo(
    () =>
      new MutationObserver((mutationList, observer) => {
        return callback(mutationList, observer);
      }),
    [callback],
  );

  useEffect(() => {
    const targetElement = getTargetElement(target);
    if (targetElement) {
      mutationObserver.observe(targetElement, options);
      return () => {
        if (mutationObserver) mutationObserver.disconnect();
      };
    }
  }, [target, options, mutationObserver]);
}

export default useMutationObserver;
