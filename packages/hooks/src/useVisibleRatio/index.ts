import { useEffect, useState } from 'react';
import 'intersection-observer';

import { getTargetElement, BasicTarget } from '../utils/dom';

type VisibleRatio = number | undefined;

function useVisibleRatio(target: BasicTarget): VisibleRatio {
  const [visibleHeightRatio, updateVisibleHeightRatio] = useState<number>(0);

  // set threshold's length with 100
  const steps = [...new Array(100).keys()].map((num: number) => num / 100);

  useEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            updateVisibleHeightRatio(Number(entry.intersectionRatio.toFixed(2)));
          } else {
            updateVisibleHeightRatio(0);
          }
        }
      },
      {
        threshold: steps,
      },
    );

    observer.observe(el as HTMLElement);

    return () => {
      observer.disconnect();
    };
  }, [typeof target === 'function' ? undefined : target]);

  return visibleHeightRatio;
}

export default useVisibleRatio;
