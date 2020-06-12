import { useEffect, useState, MutableRefObject } from 'react';
import { getTargetElement, BasicTarget } from '../utils/dom'

interface Position {
  left: number;
  top: number;
}

export type Target = BasicTarget | Document;

function useScroll(target?: Target): Position {
  const [position, setPosition] = useState<Position>({
    left: NaN,
    top: NaN,
  });

  useEffect(() => {
    const el = getTargetElement(target, document);
    if (!el) return;
    function updatePosition(currentTarget: Target) {
      let newPosition;
      if (currentTarget === document) {
        if (!document.scrollingElement) return;
        newPosition = {
          left: document.scrollingElement.scrollLeft,
          top: document.scrollingElement.scrollTop,
        };
      } else {
        newPosition = {
          left: (currentTarget as HTMLElement).scrollLeft,
          top: (currentTarget as HTMLElement).scrollTop,
        };
      }
      setPosition(newPosition);
    }
    updatePosition(el as Target);
    function listener(event: Event) {
      if (!event.target) return;
      updatePosition(event.target as Target);
    }
    el.addEventListener('scroll', listener);
    return () => {
      el.removeEventListener('scroll', listener);
    };
  }, [target]);
  return position;
}

export default useScroll;
