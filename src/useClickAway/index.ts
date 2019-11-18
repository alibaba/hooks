import { RefObject, useEffect, useCallback } from 'react';

// 鼠标点击事件，click 不会监听右键
const defaultEvents = ['mousedown', 'touchstart'];

const useClickAway = (
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: KeyboardEvent) => void,
  events: string[] = defaultEvents,
) => {
  const handler = useCallback(
    event => {
      const { current: el } = ref;
      if (!el || el.contains(event.target)) {
        return;
      }

      onClickAway(event);
    },
    [ref, onClickAway],
  );

  useEffect(() => {
    for (const eventName of events) {
      document.addEventListener(eventName, handler);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handler);
      }
    };
  }, [events, handler]);
};

export default useClickAway;
