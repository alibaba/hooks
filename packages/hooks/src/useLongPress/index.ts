import { useRef } from 'react';
import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type EventType = MouseEvent | TouchEvent;
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

  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const isTriggeredRef = useRef(false);
  const pervPositionRef = useRef({ x: 0, y: 0 });
  const mousePressed = useRef(false);
  const touchPressed = useRef(false);
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
        const { clientX, clientY } = getClientPosition(event);
        const offsetX = Math.abs(clientX - pervPositionRef.current.x);
        const offsetY = Math.abs(clientY - pervPositionRef.current.y);

        return !!(
          (moveThreshold?.x && offsetX > moveThreshold.x) ||
          (moveThreshold?.y && offsetY > moveThreshold.y)
        );
      };

      function getClientPosition(event: EventType) {
        if ('TouchEvent' in window && event instanceof TouchEvent) {
          return {
            clientX: event.touches[0].clientX,
            clientY: event.touches[0].clientY,
          };
        }
        if (event instanceof MouseEvent) {
          return {
            clientX: event.clientX,
            clientY: event.clientY,
          };
        }

        return { clientX: 0, clientY: 0 };
      }

      const createTimer = (event: EventType) => {
        timerRef.current = setTimeout(() => {
          onLongPressRef.current(event);
          isTriggeredRef.current = true;
        }, delay);
      };

      const onTouchStart = (event: TouchEvent) => {
        if (touchPressed.current) {
          return;
        }
        touchPressed.current = true;

        if (hasMoveThreshold) {
          const { clientX, clientY } = getClientPosition(event);
          pervPositionRef.current.x = clientX;
          pervPositionRef.current.y = clientY;
        }
        createTimer(event);
      };

      const onMouseDown = (event: MouseEvent) => {
        if ((event as any)?.sourceCapabilities?.firesTouchEvents) {
          return;
        }

        // Only handle left mouse button (button 0)
        // Ignore right-click (button 2) and middle-click (button 1)
        // If button is undefined (e.g., in tests), default to left button
        if (event?.button !== undefined && event.button !== 0) {
          return;
        }

        mousePressed.current = true;

        if (hasMoveThreshold) {
          pervPositionRef.current.x = event.clientX;
          pervPositionRef.current.y = event.clientY;
        }
        createTimer(event);
      };

      const onMove = (event: EventType) => {
        if (timerRef.current && overThreshold(event)) {
          clearTimeout(timerRef.current);
          timerRef.current = undefined;
        }
      };

      const onTouchEnd = (event: TouchEvent) => {
        if (!touchPressed.current) {
          return;
        }
        touchPressed.current = false;

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

      const onMouseUp = (event: MouseEvent) => {
        if ((event as any)?.sourceCapabilities?.firesTouchEvents) {
          return;
        }
        if (!mousePressed.current) {
          return;
        }
        mousePressed.current = false;

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

      const onMouseLeave = (event: MouseEvent) => {
        if (!mousePressed.current) {
          return;
        }
        mousePressed.current = false;

        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = undefined;
        }
        if (isTriggeredRef.current) {
          onLongPressEndRef.current?.(event);
          isTriggeredRef.current = false;
        }
      };

      const onContextMenu = (event: Event) => {
        // Prevent context menu if long press was triggered
        if (isTriggeredRef.current) {
          event.preventDefault();
        }
      };

      targetElement.addEventListener('mousedown', onMouseDown as EventListener);
      targetElement.addEventListener('mouseup', onMouseUp as EventListener);
      targetElement.addEventListener('mouseleave', onMouseLeave as EventListener);
      targetElement.addEventListener('touchstart', onTouchStart as EventListener);
      targetElement.addEventListener('touchend', onTouchEnd as EventListener);
      targetElement.addEventListener('contextmenu', onContextMenu as EventListener);

      if (hasMoveThreshold) {
        targetElement.addEventListener('mousemove', onMove as EventListener);
        targetElement.addEventListener('touchmove', onMove as EventListener);
      }

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          isTriggeredRef.current = false;
        }

        targetElement.removeEventListener('mousedown', onMouseDown as EventListener);
        targetElement.removeEventListener('mouseup', onMouseUp as EventListener);
        targetElement.removeEventListener('mouseleave', onMouseLeave as EventListener);
        targetElement.removeEventListener('touchstart', onTouchStart as EventListener);
        targetElement.removeEventListener('touchend', onTouchEnd as EventListener);
        targetElement.removeEventListener('contextmenu', onContextMenu as EventListener);

        if (hasMoveThreshold) {
          targetElement.removeEventListener('mousemove', onMove as EventListener);
          targetElement.removeEventListener('touchmove', onMove as EventListener);
        }
      };
    },
    [],
    target,
  );
}

export default useLongPress;
