import { useRef, useState } from 'react';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type TargetType = HTMLElement | Element;
export type Target = BasicTarget<TargetType>;

export type UseBoundingOptions = {
  /**
   * Reset values to 0 on component unmounted
   * @default true
   */
  reset?: boolean;
  /**
   * Listen to window resize event
   * @default true
   */
  windowResize?: boolean;
  /**
   * Listen to window scroll event
   * @default true
   */
  windowScroll?: boolean;
};
export type UseBoundingReturn = ReturnType<typeof useBounding>;
export type UseBoundingRect = {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  x: number;
  y: number;
};

export const INIT_BOUNDING_RECT = {
  width: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  x: 0,
  y: 0,
};

function useBounding(target: Target, options: UseBoundingOptions = {}): UseBoundingRect {
  const { reset = true, windowResize = true, windowScroll = true } = options;
  const [state, setState] = useState<UseBoundingRect>(INIT_BOUNDING_RECT);
  let observer = useRef<ResizeObserver>();

  function update() {
    const el = getTargetElement(target);

    if (!el) {
      if (reset) {
        setState(INIT_BOUNDING_RECT);
      }
      return;
    }

    setState(el.getBoundingClientRect());
  }

  useEffectWithTarget(
    () => {
      const el = getTargetElement(target);

      if (!el) {
        update();
        return;
      }

      observer.current = new ResizeObserver(update);
      observer.current?.observe(el);

      if (windowResize) {
        window.addEventListener('resize', update);
      }
      if (windowScroll) {
        window.addEventListener('scroll', update);
      }

      return () => {
        observer.current?.disconnect();

        if (windowResize) {
          window.removeEventListener('resize', update);
        }
        if (windowScroll) {
          window.removeEventListener('scroll', update);
        }
      };
    },
    [reset, windowResize, windowScroll],
    target,
  );

  return state;
}

export default useBounding;
