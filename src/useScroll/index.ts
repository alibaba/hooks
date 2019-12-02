import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface Position {
  left: number;
  top: number;
}

type Arg = HTMLElement | (() => HTMLElement) | null;

function useScroll<T extends HTMLElement = HTMLElement>(): [Position, MutableRefObject<T>];
function useScroll<T extends HTMLElement = HTMLElement>(arg: Arg): [Position];
function useScroll<T extends HTMLElement = HTMLElement>(...args: [Arg] | []) {
  const [position, setPosition] = useState<Position>({
    left: NaN,
    top: NaN,
  });
  const ref = useRef<T>();

  const hasPassedInElement = args.length === 1;
  const arg = args[0];

  useEffect(() => {
    const passedInElement = typeof arg === 'function' ? arg() : arg;
    const element = hasPassedInElement ? passedInElement : ref.current;
    if (!element) return;
    setPosition({
      left: element.scrollLeft,
      top: element.scrollTop,
    });
    function listener(event: Event) {
      setPosition({
        left: (event.target as HTMLElement).scrollLeft,
        top: (event.target as HTMLElement).scrollTop,
      });
    }
    element.addEventListener('scroll', listener);
    return () => {
      element.removeEventListener('scroll', listener);
    };
  }, [ref.current, typeof arg === 'function' ? undefined : arg]);
  return [position, ref];
}

export default useScroll;
