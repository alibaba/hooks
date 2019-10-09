import React, { useEffect, useState, useRef, MutableRefObject, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

type args = HTMLElement | (() => HTMLElement);

function useSize<T = HTMLElement>(
  ...args: args[]
): [{ width: number; height: number }, MutableRefObject<T>] {
  const element = useRef<T>(null);
  const [state, setState] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const hasPassedInRef = args.length === 1;
    const passedInRef =
      typeof args[0] === 'function' ? (args[0] as (() => HTMLElement))() : args[0];

    if (hasPassedInRef) {
      if (!passedInRef) {
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
      hasPassedInRef
        ? ((passedInRef as unknown) as HTMLElement)
        : ((element.current as unknown) as HTMLElement),
    );
    return () => {
      resizeObserver.disconnect();
    };
  }, [element.current, typeof args[0] === 'function' ? undefined : args[0]]);

  return [state, element as MutableRefObject<T>];
}

export default useSize;
