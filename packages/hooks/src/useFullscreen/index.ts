import { useState } from 'react';
import screenfull from 'screenfull';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import useUnmount from '../useUnmount';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';

export interface Options {
  onExit?: () => void;
  onEnter?: () => void;
  isBrowserFullscreen?: boolean;
}

const useFullscreen = (target: BasicTarget, options?: Options) => {
  const { onExit, onEnter, isBrowserFullscreen } = options || {};

  const onExitRef = useLatest(onExit);
  const onEnterRef = useLatest(onEnter);

  const [state, setState] = useState(false);

  const onChange = () => {
    if (screenfull.isEnabled) {
      const { isFullscreen } = screenfull;
      if (isFullscreen) {
        onEnterRef.current?.();
      } else {
        screenfull.off('change', onChange);
        onExitRef.current?.();
      }
      setState(isFullscreen);
    }
  };

  const setStyleFullscreen = (val: boolean) => {
    const el = getTargetElement(target);
    console.log(val);

    if (!el) {
      return;
    }
    const getStyleElem = document.getElementById('hook-fullScreenStyle') as HTMLStyleElement;
    if (val) {
      el.classList.add('hook-fullscreen');
      if (!getStyleElem) {
        const styleElem = document.createElement('style');
        styleElem.setAttribute('id', 'hook-fullScreenStyle');
        styleElem.textContent = `.hook-fullscreen{ position:fixed;left:0;top:0;right:0;bottom:0;z-index:2000;width:100%!important;height:100%!important;}`;
        el.appendChild(styleElem);
      }
    } else {
      el.classList.remove('hook-fullscreen');
      if (getStyleElem) {
        getStyleElem.remove();
      }
    }
    setState(!state);
  };
  const enterFullscreen = () => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    if (isBrowserFullscreen) {
      setStyleFullscreen(true);
      return;
    }
    if (screenfull.isEnabled) {
      try {
        screenfull.request(el);
        screenfull.on('change', onChange);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const exitFullscreen = () => {
    if (isBrowserFullscreen) {
      setStyleFullscreen(false);
      return;
    }
    if (screenfull.isEnabled) {
      screenfull.exit();
    }
  };

  const toggleFullscreen = () => {
    console.log(state);

    if (state) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  useUnmount(() => {
    if (!isBrowserFullscreen) {
      if (screenfull.isEnabled) {
        screenfull.off('change', onChange);
      }
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
