import 'intersection-observer';
import { useEffect, useState } from 'react';
import type { BasicTarget } from '../utils/dom2';
import { getTargetElement } from '../utils/dom2';

export interface Options {
  rootMargin?: string;
  threshold?: number | number[];
  root?: BasicTarget<Element>;
}

function useInViewport(target: BasicTarget, options?: Options) {
  const [state, setState] = useState<boolean>();
  const [ratio, setRatio] = useState<number>();

  useEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setRatio(entry.intersectionRatio);
          if (entry.isIntersecting) {
            setState(true);
          } else {
            setState(false);
          }
        }
      },
      {
        ...options,
        root: getTargetElement(options?.root),
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [typeof target === 'function' ? undefined : target]);

  return [state, ratio] as const;
}

export default useInViewport;
