import { useState } from 'react';
import screenfull from 'screenfull';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import useUnmount from '../useUnmount';
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

  const [state, setState] = useState(false);

  const invokeCallback = (fullscreen: boolean) => {
    if (fullscreen) {
      onEnterRef.current?.();
    } else {
      onExitRef.current?.();
    }
  };

  // Memoized, otherwise it will be listened multiple times.
  const onScreenfullChange = useMemoizedFn(() => {
    if (screenfull.isEnabled) {
      const el = getTargetElement(target);

      if (!screenfull.element) {
        invokeCallback(false);
        setState(false);
        screenfull.off('change', onScreenfullChange);
      } else {
        const isFullscreen = screenfull.element === el;

        invokeCallback(isFullscreen);
        setState(isFullscreen);
      }
    }
  });

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

    // Prevent repeated calls when the state is not changed.
    if (state !== fullscreen) {
      invokeCallback(fullscreen);
      setState(fullscreen);
    }
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
        screenfull.on('change', onScreenfullChange);
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

  useUnmount(() => {
    if (screenfull.isEnabled && !pageFullscreen) {
      screenfull.off('change', onScreenfullChange);
    }
  });

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
