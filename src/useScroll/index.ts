import { RefObject, useEffect, useState } from 'react';

interface Position {
  left: number;
  top: number;
}

function useScroll(ref: RefObject<HTMLElement>) {
  const [position, setPosition] = useState<Position>({
    left: NaN,
    top: NaN,
  });
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
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
  }, [ref]);
  return position;
}

export default useScroll;
