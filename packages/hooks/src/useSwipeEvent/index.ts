import { useRef, useEffect } from 'react';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';

export interface Options {
  threshold?: number;
  maxTime?: number;
  screenRatioX?: number;
  screenRatioY?: number;
  onSwipeLeft?: (distance: number, event: TouchEvent) => void;
  onSwipeRight?: (distance: number, event: TouchEvent) => void;
  onSwipeUp?: (distance: number, event: TouchEvent) => void;
  onSwipeDown?: (distance: number, event: TouchEvent) => void;
}

function useSwipeEvent(target: BasicTarget, options: Options) {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const startTime = useRef<number>(0);
  const {
    threshold = 50,
    maxTime = 300,
    screenRatioX = 0.5,
    screenRatioY = 0.3,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  } = options;

  useEffect(() => {
    const handleTouchStart = (event) => {
      startTime.current = Date.now();
      touchStartX.current = event.touches[0].clientX;
      touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchEnd = (event) => {
      if (touchStartX.current === null || touchStartY.current === null) return;

      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX.current;
      const diffY = touchEndY - touchStartY.current;
      const totalTime = Date.now() - startTime.current;
      const isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);

      if (isHorizontalSwipe) {
        const distanceX = diffX;
        const isFastSwipe = Math.abs(diffX) >= threshold && totalTime <= maxTime;
        const isTriggerSwipe =
          isFastSwipe || (totalTime > maxTime && Math.abs(diffX) / screenWidth > screenRatioX);

        if (isTriggerSwipe) {
          if (diffX > 0 && onSwipeRight) {
            onSwipeRight(distanceX, event);
          } else if (diffX < 0 && onSwipeLeft) {
            onSwipeLeft(distanceX, event);
          }
        }
      } else {
        const distanceY = diffY;
        const isFastSwipe = Math.abs(diffY) >= threshold && totalTime <= maxTime;
        const isTriggerSwipe =
          isFastSwipe || (totalTime > maxTime && Math.abs(diffY) / screenHeight > screenRatioY);

        if (isTriggerSwipe) {
          if (diffY > 0 && onSwipeDown) {
            onSwipeDown(distanceY, event);
          } else if (diffY < 0 && onSwipeUp) {
            onSwipeUp(distanceY, event);
          }
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    };

    const el = getTargetElement(target);

    if (!el) {
      return;
    }

    el.addEventListener('touchstart', handleTouchStart);
    el.addEventListener('touchend', handleTouchEnd);

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    maxTime,
    threshold,
    screenRatioX,
    screenRatioY,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  ]);
}

export default useSwipeEvent;
