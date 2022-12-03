import { useEffect, useRef, useState } from 'react';
import screenfull from 'screenfull';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';

export interface Options {
  onExit?: () => void;
  onEnter?: () => void;
}

const useFullscreen = (target: BasicTarget, options?: Options) => {
  const { onExit, onEnter } = options || {};

  const onExitRef = useLatest(onExit);
  const onEnterRef = useLatest(onEnter);
  const isSelfInFullscreen = useRef(false);

  const [state, setState] = useState(
    () =>
      screenfull.isEnabled &&
      Boolean(screenfull.element) &&
      screenfull.element === getTargetElement(target),
  );

  const enterFullscreen = () => {
    const el = getTargetElement(target);
    if (!screenfull.isEnabled || !el) {
      return;
    }

    try {
      screenfull.request(el);
    } catch (error) {
      console.error(error);
    }
  };

  const exitFullscreen = () => {
    const el = getTargetElement(target);
    if (screenfull.isEnabled && screenfull.element === el) {
      screenfull.exit();
    }
  };

  const toggleFullscreen = () => {
    if (state) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  useEffect(() => {
    if (!screenfull.isEnabled) {
      return;
    }

    const onChange = () => {
      const el = getTargetElement(target);
      const isFullscreen = Boolean(screenfull.element) && screenfull.element === el;

      // Previous was fullscreen, but now is not
      if (isSelfInFullscreen.current && !isFullscreen) {
        onExitRef.current?.();
      } else if (isFullscreen) {
        onEnterRef.current?.();
      }
      setState(isFullscreen);
      isSelfInFullscreen.current = isFullscreen;
    };

    screenfull.on('change', onChange);
    return () => {
      screenfull.off('change', onChange);
    };
  }, []);

  return [
    state,
    {
      enterFullscreen: useMemoizedFn(enterFullscreen),
      exitFullscreen: useMemoizedFn(exitFullscreen),
      toggleFullscreen: useMemoizedFn(toggleFullscreen),
      isEnabled: screenfull.isEnabled,
    },
  ] as const;
};

export default useFullscreen;
