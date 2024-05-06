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
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const startTime = useRef(0);
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

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // horizontal swipe
        if (Math.abs(diffX) < threshold) {
          return;
        }

        if (totalTime > maxTime) {
          // swipe slow
          const ratio = Math.abs(diffX) / window.screen.width;
          if (ratio > screenRatioX) {
            if (diffX > 0 && onSwipeRight) {
              onSwipeRight(diffX, event);
            } else if (diffX < 0 && onSwipeLeft) {
              onSwipeLeft(diffX, event);
            }
          }
        } else {
          // immediate swipe
          if (diffX > 0 && onSwipeRight) {
            onSwipeRight(diffX, event);
          } else if (diffX < 0 && onSwipeLeft) {
            onSwipeLeft(diffX, event);
          }
        }
      } else {
        // vertical swipe
        if (Math.abs(diffY) < threshold) {
          return;
        }

        if (totalTime > maxTime) {
          // swipe slow
          const ratio = Math.abs(diffY) / window.screen.height;
          if (ratio > screenRatioY) {
            if (diffY > 0 && onSwipeDown) {
              onSwipeDown(diffY, event);
            } else if (diffY < 0 && onSwipeUp) {
              onSwipeUp(diffY, event);
            }
          }
        } else {
          if (diffY > 0 && onSwipeDown) {
            onSwipeDown(diffY, event);
          } else if (diffY < 0 && onSwipeUp) {
            onSwipeUp(diffY, event);
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
