import { useEffect, useState } from 'react';

interface Position {
  left: number;
  top: number;
}

type Target = HTMLElement | Document | React.RefObject<HTMLInputElement>;

function useScroll(target: Target): Position {
  const [position, setPosition] = useState<Position>({
    left: NaN,
    top: NaN,
  });

  useEffect(() => {
    // @ts-ignore
    const element = target.current ? target.current : target;
    if (!element) return;
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
    updatePosition(element);
    function listener(event: Event) {
      if (!event.target) return;
      updatePosition(event.target as Target);
    }
    element.addEventListener('scroll', listener);
    return () => {
      element.removeEventListener('scroll', listener);
    };
  }, [target]);
  return position;
}

export default useScroll;
