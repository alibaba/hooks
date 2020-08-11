import { useEffect, useState } from 'react';
import 'intersection-observer';
import { getTargetElement, BasicTarget } from '../utils/dom';

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

function useInViewport(target: BasicTarget): InViewport {
  const [el, setEl] = useState(() => getTargetElement(target));

  const [inViewPort, setInViewport] = useState<InViewport>(() => {
    return isInViewPort(el as HTMLElement);
  });

  useEffect(() => {
    const newEl = getTargetElement(target);
    if (el !== newEl) {
      setEl(newEl);
      setInViewport(isInViewPort(newEl as HTMLElement));
    }
  });

  useEffect(() => {
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
  }, [el]);

  return inViewPort;
}

export default useInViewport;
