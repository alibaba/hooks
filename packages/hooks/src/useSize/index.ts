import { useState, useRef, MutableRefObject, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

type Arg = HTMLElement | (() => HTMLElement) | null;

type Size = { width?: number; height?: number };

function useSize<T extends HTMLElement = HTMLElement>(): [Size, MutableRefObject<T>];
function useSize<T extends HTMLElement = HTMLElement>(arg: Arg): [Size];
function useSize<T extends HTMLElement = HTMLElement>(
  ...args: [Arg] | []
): [Size, MutableRefObject<T>?] {
  const hasPassedInElement = args.length === 1;
  const arg = useRef(args[0]);
  [arg.current] = args;
  const element = useRef<T>();
  const [state, setState] = useState<Size>(() => {
    const initDOM = typeof arg.current === 'function' ? arg.current() : arg.current;
    return {
      width: (initDOM || {}).clientWidth,
      height: (initDOM || {}).clientHeight,
    };
  });

  useLayoutEffect(() => {
    const passedInElement = typeof arg.current === 'function' ? arg.current() : arg.current;
    const targetElement = hasPassedInElement ? passedInElement : element.current;
    if (!targetElement) {
      return () => {};
    }

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setState({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      });
    });

    resizeObserver.observe(targetElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [element.current, typeof arg.current === 'function' ? undefined : arg.current]);

  if (hasPassedInElement) {
    return [state];
  }
  return [state, element as MutableRefObject<T>];
}

export default useSize;
