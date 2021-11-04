import { useEffect, useRef } from 'react';
import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/dom2';
import { getTargetElement } from '../utils/dom2';

type EventType = MouseEvent | TouchEvent;
export interface Options {
  delay?: number;
  onClick?: (event: EventType) => void;
}

// @ts-ignore
const touchSupported =
  'ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch);

function useLongPress(
  onLongPress: (event: EventType) => void,
  target: BasicTarget,
  { delay = 300, onClick }: Options = {},
) {
  const onLongPressRef = useLatest(onLongPress);

  const timerRef = useRef<NodeJS.Timeout>();
  const isTriggeredRef = useRef(false);

  useEffect(() => {
    const targetElement = getTargetElement(target);
    if (!targetElement?.addEventListener) {
      return;
    }

    const onStart = (event: TouchEvent | MouseEvent) => {
      timerRef.current = setTimeout(() => {
        onLongPressRef.current(event);
        isTriggeredRef.current = true;
      }, delay);
    };

    const onEnd = (event: TouchEvent | MouseEvent, shouldTriggerClick: boolean = false) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (shouldTriggerClick && !isTriggeredRef.current && onClick) {
        onClick(event);
      }
      isTriggeredRef.current = false;
    };

    const onEndWithClick = (event: TouchEvent | MouseEvent) => onEnd(event, true);

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
  }, [typeof target === 'function' ? undefined : target]);
}

export default useLongPress;
