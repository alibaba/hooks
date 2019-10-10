import React, { useEffect, useState, useRef, MutableRefObject, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

type Arg = HTMLElement | (() => HTMLElement);

function useSize<T extends HTMLElement = HTMLElement>(): [{ width: number; height: number }];
function useSize<T extends HTMLElement = HTMLElement>(
  arg: Arg,
): [{ width: number; height: number }, MutableRefObject<T>];
function useSize<T extends HTMLElement = HTMLElement>(arg?: Arg) {
  const element = useRef<T>(null);
  const [state, setState] = useState({ width: 0, height: 0 });
  const hasPassedInElement = !!arg;

  useLayoutEffect(() => {
    const passedInElement = typeof arg === 'function' ? (arg as (() => HTMLElement))() : arg;

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
  }, [element.current, typeof arg === 'function' ? undefined : arg]);

  if (hasPassedInElement) {
    return [state] as [{ width: number; height: number }];
  }
  return [state, element as MutableRefObject<T>] as [
    { width: number; height: number },
    MutableRefObject<T>,
  ];
}

export default useSize;
