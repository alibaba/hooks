import { useState, useLayoutEffect, MutableRefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { getTargetElement } from '../utils/dom';

type Target = HTMLElement | (() => HTMLElement) | MutableRefObject<HTMLElement>;

type Size = { width?: number; height?: number };

function useSize(target: Target): Size {
  const [state, setState] = useState<Size>(() => {
    const el = getTargetElement(target);
    return {
      width: ((el || {}) as HTMLElement).clientWidth,
      height: ((el || {}) as HTMLElement).clientHeight,
    };
  });

  useLayoutEffect(() => {
    const el = getTargetElement(target)
    if (!el) {
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

    resizeObserver.observe(el as HTMLElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [typeof target === 'function' ? undefined : target]);


  return state;
}

export default useSize;
