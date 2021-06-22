import { useEffect, useState } from 'react';
import usePersistFn from '../usePersistFn';
import { BasicTarget, getTargetElement } from '../utils/dom';

interface Position {
  left: number;
  top: number;
}

interface ScrollArea {
  scrollWidth: number;
  scrollHeight: number;
}

interface Options {
  position: Position;
  scrollArea?: ScrollArea;
}

export type Target = BasicTarget<HTMLElement | Document>;
export type ScrollListenController = (val: Position) => boolean;

function useScroll(target?: Target, shouldUpdate: ScrollListenController = () => true): Options {
  const [position, setPosition] = useState<Position>({
    left: NaN,
    top: NaN,
  });

  const [scrollArea, setScrollArea] = useState<ScrollArea>({
    scrollWidth: NaN,
    scrollHeight: NaN,
  });

  const shouldUpdatePersist = usePersistFn(shouldUpdate);

  useEffect(() => {
    const el = getTargetElement(target, document);
    if (!el) return;
    setScrollArea({
      scrollWidth:
        (el as Target) === document
          ? document.scrollingElement!.scrollWidth
          : (el as HTMLElement).scrollWidth,
      scrollHeight:
        (el as Target) === document
          ? document.scrollingElement!.scrollHeight
          : (el as HTMLElement).scrollHeight,
    });
  }, [target]);

  useEffect(() => {
    const el = getTargetElement(target, document);
    if (!el) return;
    function updatePosition(currentTarget: Target): void {
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
      if (shouldUpdatePersist(newPosition)) setPosition(newPosition);
    }

    updatePosition(el as Target);

    function listener(event: Event): void {
      if (!event.target) return;
      updatePosition(event.target as Target);
    }
    el.addEventListener('scroll', listener);
    return () => {
      el.removeEventListener('scroll', listener);
    };
  }, [target, shouldUpdatePersist]);

  return {
    position,
    scrollArea,
  };
}

export default useScroll;
