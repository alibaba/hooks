import { useEffect, useRef } from 'react';

function useEventListener(eventName: string, handler: Function, element?: HTMLElement | Window) {
  element = element || window;
  const savedHandler = useRef<Function>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (
      event: Event,
    ): EventListenerOrEventListenerObject | AddEventListenerOptions =>
      savedHandler.current && savedHandler.current(event);

    element && element.addEventListener(eventName, eventListener);

    return () => {
      element && element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

export default useEventListener;
