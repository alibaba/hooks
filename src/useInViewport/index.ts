import { useRef, useLayoutEffect, useState, MutableRefObject } from 'react';

require('intersection-observer');

type Arg = HTMLElement | (() => HTMLElement) | null;
type InViewport = boolean | undefined;

function useInViewport<T extends HTMLElement = HTMLElement>(): [InViewport, MutableRefObject<T>];
function useInViewport<T extends HTMLElement = HTMLElement>(arg: Arg): [InViewport];
function useInViewport<T extends HTMLElement = HTMLElement>(
  ...args: [Arg] | []
): [boolean, MutableRefObject<T>?] {
  const [inViewPort, setInViewport] = useState<InViewport>(undefined);
  const element = useRef<T>();
  const hasPassedInElement = args.length === 1;
  const arg = args[0];

  useLayoutEffect(() => {
    const passedInElement = typeof arg === 'function' ? arg() : arg;

    const targetElement = hasPassedInElement ? passedInElement : element.current;

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
  }, [element.current, typeof arg === 'function' ? undefined : arg]);

  if (hasPassedInElement) {
    return [inViewPort];
  }

  return [inViewPort, element as MutableRefObject<T>];
}

export default useInViewport;
