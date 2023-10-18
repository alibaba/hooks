import type { UseSwipeDirection, UseSwipeOptions, UseSwipeReturn } from './types';
import type { MutableRefObject, RefObject } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function useSwipe(
  elRef: RefObject<HTMLElement> | MutableRefObject<HTMLElement>,
  options: UseSwipeOptions = {},
): UseSwipeReturn {
  const { threshold = 50, passive = true } = options;

  const [isSwiping, setIsSwiping] = useState(false);
  const [coordsStart, setCoordsStart] = useState({ x: 0, y: 0 });
  const [coordsEnd, setCoordsEnd] = useState({ x: 0, y: 0 });

  const diffX = useMemo(() => coordsStart.x - coordsEnd.x, [coordsStart.x, coordsEnd.y]);
  const diffY = useMemo(() => coordsStart.y - coordsEnd.y, [coordsStart.y, coordsEnd.y]);

  const { max, abs } = Math;

  const isThresholdExceeded = useMemo(
    () => max(abs(diffX), abs(diffY)) >= threshold,
    [diffX, diffY],
  );

  const direction = useMemo<UseSwipeDirection>(() => {
    if (!isThresholdExceeded) {
      return null;
    }

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

  const swipeReturn: UseSwipeReturn = {
    isSwiping,
    direction,
    lengthX: diffX,
    lengthY: diffY,
  };

  const touchStartListener = useCallback((event: TouchEvent) => {
    updateCoordsStart(event);
    updateCoordsEnd(event);
    options.onSwipeStart?.(event);
  }, []);

  const touchMoveListener = useCallback(
    (event: TouchEvent) => {
      updateCoordsEnd(event);

      if (!isSwiping && isThresholdExceeded) {
        setIsSwiping(true);
      }

      console.log(isSwiping, isThresholdExceeded);

      if (isSwiping) {
        options.onSwipe?.(event, direction);
      }
    },
    [isSwiping, isThresholdExceeded],
  );

  const touchEndListener = useCallback(
    (event: TouchEvent) => {
      options.onSwipeEnd?.(event, direction);
      setIsSwiping(false);
    },
    [swipeReturn],
  );

  useEffect(() => {
    const el = elRef.current!;

    el.addEventListener('touchstart', touchStartListener, { passive });

    el.addEventListener('touchmove', touchMoveListener, { passive });

    el.addEventListener('touchend', touchEndListener, { passive });

    return () => {
      el.removeEventListener('touchstart', touchStartListener);
      el.removeEventListener('touchmove', touchMoveListener);
      el.removeEventListener('touchend', touchEndListener);
    };
  }, [swipeReturn]);

  return swipeReturn;
}
