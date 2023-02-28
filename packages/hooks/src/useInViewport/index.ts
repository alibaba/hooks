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

function useInViewport(target: BasicTarget | BasicTarget[], options?: Options) {
  const [state, setState] = useState<boolean>();
  const [ratio, setRatio] = useState<number>();

  useEffectWithTarget(
    () => {
      const targets = Array.isArray(target) ? target : [target];

      const els = targets.map((element) => getTargetElement(element)).filter(Boolean);

      if (!els.length) {
        return;
      }

      const { callback, ...option } = options || {};

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setRatio(entry.intersectionRatio);
            setState(entry.isIntersecting);
            if (callback) {
              callback(entry);
            }
          }
        },
        {
          ...option,
          root: getTargetElement(option?.root),
        },
      );

      els.forEach((el) => {
        observer.observe(el as Element);
      });

      return () => {
        observer.disconnect();
      };
    },
    [options?.rootMargin, options?.threshold],
    target,
  );

  return [state, ratio] as const;
}

export default useInViewport;
