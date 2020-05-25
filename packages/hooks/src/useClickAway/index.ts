import { useEffect, useCallback } from 'react';

// 鼠标点击事件，click 不会监听右键
const defaultEvent = 'click';

type EventType = MouseEvent | TouchEvent;
type Target = () => HTMLElement | React.RefObject<HTMLElement>;

export default function useClickAway(
  onClickAway: (event: EventType) => void,
  target?: Target,
  eventName: string = defaultEvent,
) {
  const handler = useCallback(
    event => {
      // @ts-ignore
      const targetElement = typeof target === 'function' ? target() : target.current;
      if (!targetElement || targetElement.contains(event.target)) {
        return;
      }

      onClickAway(event);
    },
    [onClickAway, target],
  );

  useEffect(() => {
    document.addEventListener(eventName, handler);

    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [eventName, handler]);
}
