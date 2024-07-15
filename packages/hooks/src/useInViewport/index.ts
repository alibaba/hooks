import 'intersection-observer';
import { useCallback, useRef, useState } from 'react';
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
  const { callback, ...option } = options || {};

  const [state, setState] = useState<boolean>();
  const [ratio, setRatio] = useState<number>();
  const ref = useRef<IntersectionObserver>();

  const disconnect = useCallback(() => {
    ref.current?.disconnect();
  }, []);

  useEffectWithTarget(
    () => {
      const targets = Array.isArray(target) ? target : [target];
      const els = targets.map((element) => getTargetElement(element)).filter(Boolean);

      if (!els.length) {
        return;
      }

      ref.current = new IntersectionObserver(
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

      els.forEach((el) => ref.current?.observe(el!));

      return disconnect;
    },
    [options?.rootMargin, options?.threshold, callback, disconnect],
    target,
  );

  return [state, ratio, disconnect] as const;
}

export default useInViewport;
