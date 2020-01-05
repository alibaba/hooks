import { MutableRefObject, useEffect, useRef } from 'react';

type Target = HTMLElement | Window;
type Options = { dom?: Dom, eventListenerOptions?: boolean | AddEventListenerOptions }
type Dom = Target | (() => Target) | null;

function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: { eventListenerOptions?: boolean | AddEventListenerOptions },
): MutableRefObject<T>;

function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: { dom: Dom, eventListenerOptions?: boolean | AddEventListenerOptions },
): void

function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: Options,
) {
  const ref = useRef<T>();
  const savedHandler = useRef<Function>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const passedInElement = options &&
      (typeof options.dom === 'function' ? options.dom() : options.dom);
    let element = passedInElement ? passedInElement : ref.current || window;
    const isSupported = element.addEventListener;
    if (!isSupported) return;
    const eventListener = (
      event: Event,
    ): EventListenerOrEventListenerObject | AddEventListenerOptions =>
      savedHandler.current && savedHandler.current(event);

    if (options && options.eventListenerOptions) {
      element.addEventListener(eventName, eventListener,
        options.eventListenerOptions);
    } else {
      element.addEventListener(eventName, eventListener);
    }

    return () => {
      if (options && options.eventListenerOptions) {
        element && element.removeEventListener(eventName, eventListener,
          options.eventListenerOptions);
      } else {
        element && element.removeEventListener(eventName, eventListener);
      }
    };
  }, [eventName, options, ref.current]);
  return ref;
}

export default useEventListener;
