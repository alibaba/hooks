import { useState, useRef, MutableRefObject, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

type Arg = HTMLElement | (() => HTMLElement) | null;

type Size = { width: number; height: number; top: number; left: number };

function useSize<T extends HTMLElement = HTMLElement>(): [Size, MutableRefObject<T>];
function useSize<T extends HTMLElement = HTMLElement>(arg: Arg): [Size];
function useSize<T extends HTMLElement = HTMLElement>(
  ...args: [Arg] | []
): [Size, MutableRefObject<T>?] {
  const element = useRef<T>();
  const [state, setState] = useState<Size>({ width: 0, height: 0, top: 0, left: 0 });
  const hasPassedInElement = args.length === 1;
  const arg = args[0];

  useLayoutEffect(() => {
    const passedInElement = typeof arg === 'function' ? arg() : arg;

    const targetElement = hasPassedInElement ? passedInElement : element.current;
    if (!targetElement) {
      return () => {};
    }

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const rect = entry.target.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        setState({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
        });
      });
    });

    resizeObserver.observe(targetElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [element.current, typeof arg === 'function' ? undefined : arg]);

  if (hasPassedInElement) {
    return [state];
  }
  return [state, element as MutableRefObject<T>];
}

export default useSize;
