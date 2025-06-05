import { useRef } from 'react';
import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type EventType = PointerEvent;
export interface Options {
  delay?: number;
  moveThreshold?: { x?: number; y?: number };
  onClick?: (event: EventType) => void;
  onLongPressEnd?: (event: EventType) => void;
}

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
  const isPressed = useRef(false);
  const pointerId = useRef<number | null>(null);
  const hasMoveThreshold = !!(
    (moveThreshold?.x && moveThreshold.x > 0) ||
    (moveThreshold?.y && moveThreshold.y > 0)
  );

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target);
      if (!targetElement?.addEventListener) {
        return;
      }

      const overThreshold = (event: EventType) => {
        const offsetX = Math.abs(event.clientX - pervPositionRef.current.x);
        const offsetY = Math.abs(event.clientY - pervPositionRef.current.y);

        return !!(
          (moveThreshold?.x && offsetX > moveThreshold.x) ||
          (moveThreshold?.y && offsetY > moveThreshold.y)
        );
      };

      const createTimer = (event: EventType) => {
        timerRef.current = setTimeout(() => {
          onLongPressRef.current(event);
          isTriggeredRef.current = true;
        }, delay);
      };

      const onPointerDown = (event: PointerEvent) => {
        if (isPressed.current) return;

        isPressed.current = true;
        pointerId.current = event.pointerId;

        // 捕获指针以确保即使指针移出元素也能接收到事件
        targetElement.setPointerCapture(event.pointerId);

        if (hasMoveThreshold) {
          pervPositionRef.current.x = event.clientX;
          pervPositionRef.current.y = event.clientY;
        }

        createTimer(event);
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!isPressed.current || event.pointerId !== pointerId.current) return;

        if (timerRef.current && overThreshold(event)) {
          clearTimeout(timerRef.current);
          timerRef.current = undefined;
        }
      };

      const onPointerUp = (event: PointerEvent) => {
        if (!isPressed.current || event.pointerId !== pointerId.current) return;

        isPressed.current = false;
        pointerId.current = null;

        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = undefined;
        }

        if (isTriggeredRef.current) {
          onLongPressEndRef.current?.(event);
        } else if (onClickRef.current) {
          onClickRef.current(event);
        }

        isTriggeredRef.current = false;
      };

      const onPointerCancel = (event: PointerEvent) => {
        if (!isPressed.current || event.pointerId !== pointerId.current) return;

        isPressed.current = false;
        pointerId.current = null;

        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = undefined;
        }

        if (isTriggeredRef.current) {
          onLongPressEndRef.current?.(event);
          isTriggeredRef.current = false;
        }
      };

      targetElement.addEventListener('pointerdown', onPointerDown);
      targetElement.addEventListener('pointerup', onPointerUp);
      targetElement.addEventListener('pointercancel', onPointerCancel);

      if (hasMoveThreshold) {
        targetElement.addEventListener('pointermove', onPointerMove);
      }

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          isTriggeredRef.current = false;
        }

        targetElement.removeEventListener('pointerdown', onPointerDown);
        targetElement.removeEventListener('pointerup', onPointerUp);
        targetElement.removeEventListener('pointercancel', onPointerCancel);

        if (hasMoveThreshold) {
          targetElement.removeEventListener('pointermove', onPointerMove);
        }
      };
    },
    [],
    target,
  );
}

export default useLongPress;