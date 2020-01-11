import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface Position {
  left: number;
  top: number;
}

type Target = HTMLElement | Document;

type Arg = Target | (() => Target) | null;

function useScroll<T extends Target = HTMLElement>(): [Position, MutableRefObject<T>];
function useScroll<T extends Target = HTMLElement>(arg: Arg): [Position];
function useScroll<T extends Target = HTMLElement>(...args: [Arg] | []) {
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
    function updatePosition(target: Target) {
      let newPosition;
      if (target === document) {
        if (!document.scrollingElement) return;
        newPosition = {
          left: document.scrollingElement.scrollLeft,
          top: document.scrollingElement.scrollTop,
        };
      } else {
        newPosition = {
          left: (target as HTMLElement).scrollLeft,
          top: (target as HTMLElement).scrollTop,
        };
      }
      setPosition(newPosition);
    }
    updatePosition(element);
    function listener(event: Event) {
      if (!event.target) return;
      updatePosition(event.target as Target);
    }
    element.addEventListener('scroll', listener);
    return () => {
      element.removeEventListener('scroll', listener);
    };
  }, [ref.current, typeof arg === 'function' ? undefined : arg]);
  return [position, ref];
}

export default useScroll;
