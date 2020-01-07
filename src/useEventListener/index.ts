import { MutableRefObject, useEffect, useRef } from 'react';

type Target = HTMLElement | Window;
type Options = { dom?: Dom; capture?: boolean; once?: boolean; passive?: boolean; }
type Dom = Target | (() => Target) | null;

function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: { capture?: boolean; once?: boolean; passive?: boolean; },
): MutableRefObject<T>;

function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: { dom: Dom, capture?: boolean; once?: boolean; passive?: boolean; },
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

    element.addEventListener(eventName, eventListener,{
      capture:options?.capture,
      once:options?.once,
      passive:options?.passive
    });

    return () => {
      element.removeEventListener(eventName, eventListener,{
        capture:options?.capture,
      });
    };
  }, [eventName, options, ref.current]);
  return ref;
}

export default useEventListener;
