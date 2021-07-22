import { useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import type { BasicTarget } from '../utils/dom';
import { getTargetElement } from '../utils/dom';
import useRafState from './useRafState';

type Size = { width?: number; height?: number };

function useSize(target: BasicTarget): Size {
  const [state, setState] = useRafState<Size>(() => {
    const el = getTargetElement(target);
    return {
      width: ((el || {}) as HTMLElement).clientWidth,
      height: ((el || {}) as HTMLElement).clientHeight,
    };
  });

  useLayoutEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      return () => {};
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
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
  }, [target]);

  return state;
}

export default useSize;
