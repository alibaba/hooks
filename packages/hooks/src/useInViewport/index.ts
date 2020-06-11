
import { useLayoutEffect, useState, MutableRefObject } from 'react';
import 'intersection-observer';
import { getTargetElement } from '../utils/dom';

type Target = HTMLElement | (() => HTMLElement) | MutableRefObject<HTMLElement>;
type InViewport = boolean | undefined;

function isInViewPort(el: HTMLElement): boolean {
  if (!el) {
    return false;
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

function useInViewport(target: Target): InViewport {
  const [inViewPort, setInViewport] = useState<InViewport>(() => {
    const el = getTargetElement(target)

    return isInViewPort(el as HTMLElement);
  });

  useEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      return () => {};
    }

    const observer = new IntersectionObserver(entries => {
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
  }, [typeof target === 'function' ? undefined : target]);

  return inViewPort;
}

export default useInViewport;
