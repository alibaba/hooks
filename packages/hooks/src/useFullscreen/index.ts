/* eslint no-empty: 0 */

import { useLayoutEffect, useRef } from 'react';
import screenfull from 'screenfull';
import useBoolean from '../useBoolean';

export interface Options {
  target: HTMLElement | React.RefObject<HTMLElement>;
  onExitFull?: () => void;
  onFull?: () => void;
}

export interface Result {
  isFullscreen: boolean;
  setFull: () => void;
  exitFull: () => void;
  toggleFull: () => void;
}

export default (options?: Options): Result => {
  const { target, onExitFull, onFull } = options || {};

  const onExitFullRef = useRef(onExitFull);
  onExitFullRef.current = onExitFull;

  const onFullRef = useRef(onFull);
  onFullRef.current = onFull;

  const { state, toggle, setTrue, setFalse } = useBoolean(false);

  useLayoutEffect(() => {
    /* 非全屏时，不需要监听任何全屏事件 */
    if (!state) {
      return;
    }

    // @ts-ignore
    const targetElement = typeof target === 'function' ? target() : target.current;
    if (!targetElement) {
      return;
    }

    /* 监听退出 */
    const onChange = () => {
      if (screenfull.isEnabled) {
        const { isFullscreen } = screenfull;
        toggle(isFullscreen);
      }
    };

    if (screenfull.isEnabled) {
      try {
        screenfull.request(targetElement);
        setTrue();
        if (onFullRef.current) {
          onFullRef.current();
        }
      } catch (error) {
        setFalse();
        if (onExitFullRef.current) {
          onExitFullRef.current();
        }
      }
      screenfull.on('change', onChange);
    }

    /* state 从 true 变为 false，则关闭全屏 */
    return () => {
      if (screenfull.isEnabled) {
        try {
          screenfull.off('change', onChange);
          screenfull.exit();
        } catch (error) {}
      }
      if (onExitFullRef.current) {
        onExitFullRef.current();
      }
    };
  }, [state, typeof target === 'function' ? undefined : target]);

  const toggleFull = () => toggle();

  const result: Result = {
    isFullscreen: !!state,
    setFull: setTrue,
    exitFull: setFalse,
    toggleFull,
  };

  return result;
};
