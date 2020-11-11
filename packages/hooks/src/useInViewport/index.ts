import { useEffect, useState } from 'react';
import 'intersection-observer';
import { getTargetElement, BasicTarget } from '../utils/dom';

type InViewport = boolean | undefined;

function isInViewPort(el: HTMLElement): InViewport  {
  if (!el) {
    return undefined;
  }

  const viewPortWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const viewPortHeight =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const rect = el.getBoundingClientRect();

  if (rect) {
    const { top, bottom, left, right } = rect;
    return bottom > 0 && top <= viewPortHeight && left <= viewPortWidth && right > 0;
  }

  return false;
}

function useInViewport(target: BasicTarget): InViewport {
  const [inViewPort, setInViewport] = useState<InViewport>(() => {
    const el = getTargetElement(target);

    return isInViewPort(el as HTMLElement);
  });

  useEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      return () => {};
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInViewport(true);
        } else {
          setInViewport(false);
        }
      }
    });

    observer.observe(el as HTMLElement);

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return inViewPort;
}

export default useInViewport;
