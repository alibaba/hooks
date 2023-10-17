import type { UseSwipeDirection, UseSwipeOptions, UseSwipeReturn } from './types';
import type { MutableRefObject } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useMount, useUnmount } from 'ahooks';

export default function useSwipe(
  elRef: MutableRefObject<HTMLElement>,
  options: UseSwipeOptions = {},
): UseSwipeReturn {
  const [isSwiping, setIsSwiping] = useState(false);
  const [coordsStart, setCoordsStart] = useState({ x: 0, y: 0 });
  const [coordsEnd, setCoordsEnd] = useState({ x: 0, y: 0 });

  const diffX = useMemo(() => coordsStart.x - coordsEnd.x, [coordsStart.x, coordsEnd.y]);
  const diffY = useMemo(() => coordsStart.y - coordsEnd.y, [coordsStart.y, coordsEnd.y]);

  const { abs } = Math;

  const direction = useMemo<UseSwipeDirection>(() => {
    if (abs(diffX) > abs(diffY)) {
      return diffX > 0 ? 'left' : 'right';
    } else {
      return diffY > 0 ? 'up' : 'down';
    }
  }, [diffX, diffY]);

  const getTouchEventCoords = (e: TouchEvent) => [e.touches[0].clientX, e.touches[0].clientY];

  const updateCoordsStart = (e: TouchEvent) => {
    const [x, y] = getTouchEventCoords(e);
    setCoordsStart({ x, y });
  };

  const updateCoordsEnd = (e: TouchEvent) => {
    const [x, y] = getTouchEventCoords(e);

    setCoordsEnd({ x, y });
  };

  const touchStartListener = useCallback((event: TouchEvent) => {
    updateCoordsStart(event);
    updateCoordsEnd(event);
    options.onSwipeStart?.(event);
    setIsSwiping(true);
  }, []);

  const touchMoveListener = useCallback((event: TouchEvent) => {
    options.onSwipe?.(event);
    updateCoordsEnd(event);
  }, []);

  const touchEndListener = useCallback((event: TouchEvent) => {
    options.onSwipeEnd?.(event, direction);
    setIsSwiping(false);
  }, []);

  useMount(() => {
    const el = elRef.current;

    el.addEventListener('touchstart', touchStartListener);

    el.addEventListener('touchmove', touchMoveListener);

    el.addEventListener('touchend', touchEndListener);
  });

  useUnmount(() => {
    const el = elRef.current;

    el.removeEventListener('touchstart', touchStartListener);
    el.removeEventListener('touchmove', touchMoveListener);
    el.removeEventListener('touchend', touchEndListener);
  });

  return {
    isSwiping,
    direction,
    lengthX: diffX,
    lengthY: diffY,
  };
}
