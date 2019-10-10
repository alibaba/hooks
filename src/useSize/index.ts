import React, { useEffect, useState, useRef, MutableRefObject, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

type Args = HTMLElement | (() => HTMLElement);

declare function useSize<T extends HTMLElement = HTMLElement>(
  ...args: [Args]
): [{ width: number; height: number }];
declare function useSize<T extends HTMLElement = HTMLElement>(
  ...args: []
): [{ width: number; height: number }, MutableRefObject<T>];

function useSize<T extends HTMLElement = HTMLElement>(...args: [Args] | []) {
  const element = useRef<T>(null);
  const [state, setState] = useState({ width: 0, height: 0 });
  const hasPassedInElement = args.length === 1;

  useLayoutEffect(() => {
    const passedInElement =
      typeof args[0] === 'function' ? (args[0] as (() => HTMLElement))() : args[0];

    if (hasPassedInElement) {
      if (!passedInElement) {
        return () => {};
      }
    } else if (!element.current) {
      return () => {};
    }

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setState({ width: entry.target.clientWidth, height: entry.target.clientHeight });
      });
    });

    resizeObserver.observe(
      hasPassedInElement ? (passedInElement as HTMLElement) : (element.current as HTMLElement),
    );
    return () => {
      resizeObserver.disconnect();
    };
  }, [element.current, typeof args[0] === 'function' ? undefined : args[0]]);

  if (hasPassedInElement) {
    return [state] as [typeof state];
  }
  return [state, element as MutableRefObject<T>] as [typeof state, MutableRefObject<T>];
}

export default useSize;
