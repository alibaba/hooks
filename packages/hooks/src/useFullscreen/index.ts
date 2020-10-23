/* eslint no-empty: 0 */

import { useCallback, useRef, useState } from 'react';
import screenfull from 'screenfull';
import useUnmount from '../useUnmount';
import { BasicTarget, getTargetElement } from '../utils/dom';

export interface Options {
  onExitFull?: () => void;
  onFull?: () => void;
}

export default (target: BasicTarget, options?: Options) => {
  const { onExitFull, onFull } = options || {};

  const onExitFullRef = useRef(onExitFull);
  onExitFullRef.current = onExitFull;

  const onFullRef = useRef(onFull);
  onFullRef.current = onFull;

  const [state, setState] = useState(false);

  const onChange = useCallback(() => {
    if (screenfull.isEnabled) {
      const { isFullscreen } = screenfull;
      if (isFullscreen) {
        onFullRef.current && onFullRef.current();
      } else {
        screenfull.off('change', onChange);
        onExitFullRef.current && onExitFullRef.current();
      }
      setState(isFullscreen);
    }
  }, []);

  const setFull = useCallback(() => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    if (screenfull.isEnabled) {
      try {
        screenfull.request(el as HTMLElement);
        screenfull.on('change', onChange);
      } catch (error) {}
    }
  }, [target, onChange]);

  const exitFull = useCallback(() => {
    if (!state) {
      return;
    }
    if (screenfull.isEnabled) {
      screenfull.exit();
    }
  }, [state]);

  const toggleFull = useCallback(() => {
    if (state) {
      exitFull();
    } else {
      setFull();
    }
  }, [state, setFull, exitFull]);

  useUnmount(() => {
    if (screenfull.isEnabled) {
      screenfull.off('change', onChange);
    }
  });

  return [
    state,
    {
      setFull,
      exitFull,
      toggleFull,
    },
  ] as const;
};
