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
  const pervPositionRef = useRef({ x: 0, y: 0 });
  const overThresholdRef = useRef(false);
  const hasMoveThreshold =
    !!((moveThreshold?.x && moveThreshold.x > 0) || (moveThreshold?.y && moveThreshold.y > 0)) &&
    touchSupported;

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target);
      if (!targetElement?.addEventListener) {
        return;
      }

      const onStart = (event: EventType) => {
        if (hasMoveThreshold) {
          pervPositionRef.current.x = (event as TouchEvent).touches[0].clientX;
          pervPositionRef.current.y = (event as TouchEvent).touches[0].clientY;
        }
        timerRef.current = setTimeout(() => {
          if (overThresholdRef.current) return;
          onLongPressRef.current(event);
          isTriggeredRef.current = true;
        }, delay);
      };

      const onMove = (event: TouchEvent) => {
        // 如果已经触发过长按事件，下面的计算就没有意义了
        if (isTriggeredRef.current) return;

        const offsetX = Math.abs(event.touches[0].clientX - pervPositionRef.current.x);
        const offsetY = Math.abs(event.touches[0].clientY - pervPositionRef.current.y);
        if (
          (moveThreshold?.x && offsetX > moveThreshold.x) ||
          (moveThreshold?.y && offsetY > moveThreshold.y)
        ) {
          overThresholdRef.current = true;
        } else {
          overThresholdRef.current = false;
        }
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
        if (hasMoveThreshold) targetElement.addEventListener('touchmove', onMove);
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
          if (hasMoveThreshold) targetElement.removeEventListener('touchmove', onMove);
        }
      };
    },
    [],
    target,
  );
}

export default useLongPress;
