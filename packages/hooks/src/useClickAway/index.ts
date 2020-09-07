import { useEffect, useCallback } from 'react';
import { getTargetElement, BasicTarget } from '../utils/dom';

// 鼠标点击事件，click 不会监听右键
const defaultEvent = 'click';

type EventType = MouseEvent | TouchEvent;

export default function useClickAway(
  onClickAway: (event: EventType) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string = defaultEvent,
) {
  const handler = useCallback(
    (event) => {
      const targets = Array.isArray(target) ? target : [target];

      if (
        targets.some((targetItem) => {
          const targetElement = getTargetElement(targetItem) as HTMLElement;
          return !targetElement || targetElement?.contains(event.target);
        })
      ) {
        return;
      }

      onClickAway(event);
    },
    [onClickAway, typeof target === 'function' ? undefined : target],
  );

  useEffect(() => {
    document.addEventListener(eventName, handler);

    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [eventName, handler]);
}
