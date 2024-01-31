import { useRef, useState } from 'react';
import { getTargetElement, type BasicTarget } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';
import useLatest from '../useLatest';
import { setRafTimeout } from '../utils/rafTimer';

export type Target = BasicTarget<Element | Document>;

export type Options = {
  target?: Target;
  scrollDirection?: 'vertical' | 'horizontal';
};

type Position = { left: number; top: number };

const getCurrentScrollPosition = (scrollEl: Target): Position => {
  if (!scrollEl) return { left: 0, top: 0 };
  let newPosition: Position;
  if (scrollEl === document) {
    if (document.scrollingElement) {
      newPosition = {
        left: document.scrollingElement.scrollLeft,
        top: document.scrollingElement.scrollTop,
      };
    } else {
      newPosition = {
        left: Math.max(
          window.pageXOffset,
          document.documentElement.scrollLeft,
          document.body.scrollLeft,
        ),
        top: Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop,
        ),
      };
    }
  } else {
    newPosition = {
      left: (scrollEl as Element).scrollLeft,
      top: (scrollEl as Element).scrollTop,
    };
  }

  return newPosition;
};

const useIsScrolling = (option?: Options) => {
  const { scrollDirection = 'vertical', target } = option ?? {};
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const prevPosition = useRef<Position | undefined>();
  const latestScrolling = useLatest(isScrolling);

  useEffectWithTarget(
    () => {
      const scrollEl = getTargetElement(target, document);
      if (!scrollEl) return;
      const getIsScrolling = () => {
        const newPosition = getCurrentScrollPosition(scrollEl);
        if (!prevPosition.current) {
          prevPosition.current = newPosition;
          return;
        }
        const delay = latestScrolling.current ? 500 : 100;
        setRafTimeout(() => {
          if (scrollDirection === 'vertical') {
            setIsScrolling(prevPosition.current?.top !== newPosition.top);
          } else if (scrollDirection === 'horizontal') {
            setIsScrolling(prevPosition.current?.left !== newPosition.left);
          }
        }, delay);
        prevPosition.current.top = newPosition.top;
        prevPosition.current.left = newPosition.left;
      };
      getIsScrolling();
      scrollEl.addEventListener('scroll', getIsScrolling);
      return () => {
        scrollEl.removeEventListener('scroll', getIsScrolling);
      };
    },
    [],
    target,
  );

  return isScrolling;
};

export default useIsScrolling;
