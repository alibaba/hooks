import { MutableRefObject, useRef, useEffect, useCallback, useMemo } from 'react';

// 鼠标点击事件，click 不会监听右键
const defaultEvent = 'click';

type RefType = () => HTMLElement | null;

export default function useClickAway<T extends HTMLElement = HTMLDivElement>(
  onClickAway: (event: KeyboardEvent) => void,
  ref?: RefType,
  eventName: string = defaultEvent,
): MutableRefObject<T> {
  const element = useRef<T>();

  const handler = useCallback(
    event => {
      const targetElement = typeof ref === 'function' ? ref() : element.current;
      if (!targetElement || targetElement.contains(event.target)) {
        return;
      }

      onClickAway(event);
    },
    [element, onClickAway, ref],
  );

  useEffect(() => {
    document.addEventListener(eventName, handler);

    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [eventName, handler]);

  return element as MutableRefObject<T>;
}
