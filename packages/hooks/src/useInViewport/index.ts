
import { useLayoutEffect, useState } from 'react';

import 'intersection-observer';

type Target = HTMLElement | React.RefObject<HTMLInputElement>;
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
    // @ts-ignore
    const targetElement = typeof target === 'function' ? target() : target.current;

    return isInViewPort(targetElement as HTMLElement);
  });

  useLayoutEffect(() => {
    // @ts-ignore
    const targetElement = typeof target === 'function' ? target() : target.current;
    if (!targetElement) {
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

    observer.observe(targetElement);

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return inViewPort;
}

export default useInViewport;
