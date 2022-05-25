import { useRef } from 'react';
import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import isBrowser from '../utils/isBrowser';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type EventType = MouseEvent | TouchEvent;
export interface Options {
  delay?: number;
  moveThreshold?: { x?: number; y?: number };
  onClick?: (event: EventType) => void;
  onLongPressEnd?: (event: EventType) => void;
}

const touchSupported =
  isBrowser &&
  // @ts-ignore
  ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch));

const getCurrentPosition = (event: EventType) => {
  const position = { x: 0, y: 0 };
  if (!touchSupported) {
    position.x = (event as MouseEvent).clientX;
    position.y = (event as MouseEvent).clientY;
  } else {
    position.x = (event as TouchEvent).touches[0].clientX;
    position.y = (event as TouchEvent).touches[0].clientY;
  }
  return position;
};

function useLongPress(
  onLongPress: (event: EventType) => void,
  target: BasicTarget,
  { delay = 300, moveThreshold, onClick, onLongPressEnd }: Options = {},
) {
  const onLongPressRef = useLatest(onLongPress);
  const onClickRef = useLatest(onClick);
  const onLongPressEndRef = useLatest(onLongPressEnd);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const isTriggeredRef = useRef(false);

  const checkMovement = !!(moveThreshold?.x || moveThreshold?.y);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target);
      if (!targetElement?.addEventListener) {
        return;
      }

      const onStart = (event: EventType) => {
        if (checkMovement) {
          positionRef.current = getCurrentPosition(event);
        }
        timerRef.current = setTimeout(() => {
          if (checkMovement) {
            const offsetX = getCurrentPosition(event).x - positionRef.current.x;
            const offsetY = getCurrentPosition(event).y - positionRef.current.y;
            if (moveThreshold?.x && moveThreshold.x > 0 && offsetX > moveThreshold.x) return;
            if (moveThreshold?.y && moveThreshold.y > 0 && offsetY > moveThreshold.y) return;
          }
          onLongPressRef.current(event);
          isTriggeredRef.current = true;
        }, delay);
      };

      const onEnd = (event: EventType, shouldTriggerClick: boolean = false) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        if (isTriggeredRef.current) {
          onLongPressEndRef.current?.(event);
        }
        if (shouldTriggerClick && !isTriggeredRef.current && onClickRef.current) {
          onClickRef.current(event);
        }
        isTriggeredRef.current = false;
      };

      const onEndWithClick = (event: EventType) => onEnd(event, true);

      if (!touchSupported) {
        targetElement.addEventListener('mousedown', onStart);
        targetElement.addEventListener('mouseup', onEndWithClick);
        targetElement.addEventListener('mouseleave', onEnd);
      } else {
        targetElement.addEventListener('touchstart', onStart);
        targetElement.addEventListener('touchend', onEndWithClick);
      }

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          isTriggeredRef.current = false;
        }
        if (!touchSupported) {
          targetElement.removeEventListener('mousedown', onStart);
          targetElement.removeEventListener('mouseup', onEndWithClick);
          targetElement.removeEventListener('mouseleave', onEnd);
        } else {
          targetElement.removeEventListener('touchstart', onStart);
          targetElement.removeEventListener('touchend', onEndWithClick);
        }
      };
    },
    [],
    target,
  );
}

export default useLongPress;
