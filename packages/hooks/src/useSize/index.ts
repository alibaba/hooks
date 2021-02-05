import { useState, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { getTargetElement, BasicTarget } from '../utils/dom';

type Size = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

type Options =
  | {
      observe?: boolean;
    }
  | {
      observe: true;
    };

export default function useSize(target: BasicTarget, options?: Options): Size {
  const [size, setSize] = useState<Size>({});

  useLayoutEffect(() => {
    const el = getTargetElement(target) as HTMLElement;
    if (!el) {
      return () => {};
    }

    if (options && !options?.observe) {
      setSize(el.getBoundingClientRect());
      return () => {};
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setSize(entry.target.getBoundingClientRect());
      });
    });
    resizeObserver.observe(el as HTMLElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [target, options?.observe]);

  return size;
}
