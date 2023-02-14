import 'intersection-observer';
import { useState } from 'react';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

export interface Options {
  rootMargin?: string;
  threshold?: number | number[];
  root?: BasicTarget<Element>;
}

type CallbackType = (entry: IntersectionObserverEntry) => void;

function useInViewport(
  target: BasicTarget | BasicTarget[],
  options?: Options,
  callback?: CallbackType,
) {
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
            if (callback) {
              callback(entry);
            }
          }
        },
        {
          ...options,
          root: getTargetElement(options?.root),
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
