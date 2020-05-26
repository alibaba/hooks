import { useEffect, useCallback, MutableRefObject } from 'react';
import { getTargetElement } from '../utils/dom';

// 鼠标点击事件，click 不会监听右键
const defaultEvent = 'click';

type EventType = MouseEvent | TouchEvent;
type Target = (() => HTMLElement) | HTMLElement | MutableRefObject<HTMLElement>;

export default function useClickAway(
  onClickAway: (event: EventType) => void,
  target: Target,
  eventName: string = defaultEvent,
) {
  const handler = useCallback(
    event => {
      const targetElement = getTargetElement(target) as HTMLElement;

      if (!targetElement || targetElement.contains(event.target)) {
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
