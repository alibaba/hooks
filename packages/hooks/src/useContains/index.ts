import { useEffect } from 'react';
import { getTargetElement } from '../utils/domTarget';
import type { BasicTarget } from '../utils/domTarget';

export type Target = BasicTarget<HTMLElement | Element>;

function useContains(ref: BasicTarget, callback: (isWithin: boolean, ev: Event) => void): void;

function useContains(ref, callback) {
  const handle = (ev: Event) => {
    const target = getTargetElement(ref);

    if (!target || !('contains' in target) || !(typeof callback === 'function')) {
      return;
    }

    const isWithin = target.contains(ev.target);

    callback(isWithin, ev);
  };

  useEffect(() => {
    const MOUSEDOWN = 'mousedown';
    const TOUCHSTART = 'touchstart';

    document.addEventListener(MOUSEDOWN, handle, true);
    document.addEventListener(TOUCHSTART, handle, true);

    return () => {
      document.removeEventListener(MOUSEDOWN, handle, true);
      document.removeEventListener(TOUCHSTART, handle, true);
    };
  }, [ref, callback]);
}

export default useContains;
