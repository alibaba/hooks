import { useEffect, useState, useRef } from 'react';
import screenfull from 'screenfull';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import { isBoolean } from '../utils';

export interface PageFullscreenOptions {
  className?: string;
  zIndex?: number;
}

export interface Options {
  onExit?: () => void;
  onEnter?: () => void;
  pageFullscreen?: boolean | PageFullscreenOptions;
}

const useFullscreen = (target: BasicTarget, options?: Options) => {
  const { onExit, onEnter, pageFullscreen = false } = options || {};
  const { className = 'ahooks-page-fullscreen', zIndex = 999999 } =
    isBoolean(pageFullscreen) || !pageFullscreen ? {} : pageFullscreen;

  const onExitRef = useLatest(onExit);
  const onEnterRef = useLatest(onEnter);

  // The state of full screen may be changed by other scripts/components,
  // so the initial value needs to be computed dynamically.
  const [state, setState] = useState(getIsFullscreen);
  const stateRef = useRef(getIsFullscreen());

  function getIsFullscreen() {
    return (
      screenfull.isEnabled &&
      !!screenfull.element &&
      screenfull.element === getTargetElement(target)
    );
  }

  const invokeCallback = (fullscreen: boolean) => {
    if (fullscreen) {
      onEnterRef.current?.();
    } else {
      onExitRef.current?.();
    }
  };

  const updateFullscreenState = (fullscreen: boolean) => {
    // Prevent repeated calls when the state is not changed.
    if (stateRef.current !== fullscreen) {
      invokeCallback(fullscreen);
      setState(fullscreen);
      stateRef.current = fullscreen;
    }
  };

  const onScreenfullChange = () => {
    const fullscreen = getIsFullscreen();

    updateFullscreenState(fullscreen);
  };

  const togglePageFullscreen = (fullscreen: boolean) => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    let styleElem = document.getElementById(className);

    if (fullscreen) {
      el.classList.add(className);

      if (!styleElem) {
        styleElem = document.createElement('style');
        styleElem.setAttribute('id', className);
        styleElem.textContent = `
          .${className} {
            position: fixed; left: 0; top: 0; right: 0; bottom: 0;
            width: 100% !important; height: 100% !important;
            z-index: ${zIndex};
          }`;
        el.appendChild(styleElem);
      }
    } else {
      el.classList.remove(className);

      if (styleElem) {
        styleElem.remove();
      }
    }

    updateFullscreenState(fullscreen);
  };

  const enterFullscreen = () => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    if (pageFullscreen) {
      togglePageFullscreen(true);
      return;
    }
    if (screenfull.isEnabled) {
      try {
        screenfull.request(el);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const exitFullscreen = () => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    if (pageFullscreen) {
      togglePageFullscreen(false);
      return;
    }
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
    if (!screenfull.isEnabled || pageFullscreen) {
      return;
    }

    screenfull.on('change', onScreenfullChange);

    return () => {
      screenfull.off('change', onScreenfullChange);
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
