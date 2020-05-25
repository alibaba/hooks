import { useEffect, useRef } from 'react';

type Target = () => HTMLElement | React.RefObject<HTMLElement>;
type Options = { target?: Target; capture?: boolean; once?: boolean; passive?: boolean; }

function useEventListener(
  eventName: string,
  handler: Function,
  options?: Options,
) {
  const savedHandler = useRef<Function>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = options && (typeof options.target === 'function'
      ? options.target()
      // @ts-ignore
      : options.target.current);
    const isSupported = targetElement.addEventListener;
    if (!isSupported) return;
    const eventListener = (
      event: Event,
    ): EventListenerOrEventListenerObject | AddEventListenerOptions =>
      savedHandler.current && savedHandler.current(event);

      targetElement.addEventListener(eventName, eventListener, {
      capture: options?.capture,
      once: options?.once,
      passive: options?.passive
    });

    return () => {
      targetElement.removeEventListener(eventName, eventListener, {
        capture: options?.capture,
      });
    };
  }, [eventName, options]);
}

export default useEventListener;
