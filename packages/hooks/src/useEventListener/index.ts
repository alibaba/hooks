import { useEffect, useRef, MutableRefObject } from 'react';
import { getTargetElement, BasicTarget } from '../utils/dom';

export type Target = BasicTarget<HTMLElement | Window>;

type Options = { target?: Target; capture?: boolean; once?: boolean; passive?: boolean };

function useEventListener(eventName: string, handler: Function, options?: Options) {
  const savedHandler = useRef<Function>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = getTargetElement(options?.target, window)!;

    const isSupported = targetElement.addEventListener;

    if (!isSupported) return;
    const eventListener = (
      event: Event,
    ): EventListenerOrEventListenerObject | AddEventListenerOptions =>
      savedHandler.current && savedHandler.current(event);

    targetElement.addEventListener(eventName, eventListener, {
      capture: options?.capture,
      once: options?.once,
      passive: options?.passive,
    });

    return () => {
      targetElement.removeEventListener(eventName, eventListener, {
        capture: options?.capture,
      });
    };
  }, [eventName, options]);
}

export default useEventListener;
