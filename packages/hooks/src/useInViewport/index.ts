import 'intersection-observer';
import { useState } from 'react';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type CallbackType = (entry: IntersectionObserverEntry) => void;

export interface Options {
  rootMargin?: string;
  threshold?: number | number[];
  root?: BasicTarget<Element>;
  callback?: CallbackType;
}

/**
 * Observe whether the element is in the visible area, and the visible area ratio of the element. refer to [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
 * @see https://ahooks.js.org/hooks/use-in-viewport
 */
function useInViewport(target: BasicTarget | BasicTarget[], options?: Options) {
  const { callback, ...option } = options || {};

  const [state, setState] = useState<boolean>();
  const [ratio, setRatio] = useState<number>();

  useEffectWithTarget(
    () => {
      const targets = Array.isArray(target) ? target : [target];
      const els = targets.map((element) => getTargetElement(element)).filter(Boolean);

      if (!els.length) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setRatio(entry.intersectionRatio);
            setState(entry.isIntersecting);
            callback?.(entry);
          }
        },
        {
          ...option,
          root: getTargetElement(options?.root),
        },
      );

      els.forEach((el) => {
        if (el) {
          observer.observe(el);
        }
      });

      return () => {
        observer.disconnect();
      };
    },
    [options?.rootMargin, options?.threshold, callback],
    target,
  );

  return [state, ratio] as const;
}

export default useInViewport;
