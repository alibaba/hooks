/* eslint no-empty: 0 */

import { MutableRefObject, useLayoutEffect, useRef } from 'react';
import screenfull from 'screenfull';
import useBoolean from '../useBoolean';

export interface Options<T> {
  dom?: T | (() => T) | null;
  onExitFull?: () => void;
  onFull?: () => void;
}

export interface Result<T> {
  isFullscreen: boolean;
  setFull: () => void;
  exitFull: () => void;
  toggleFull: () => void;
  ref?: MutableRefObject<T>;
}

export default <T extends HTMLElement = HTMLElement>(options?: Options<T>): Result<T> => {
  const { dom, onExitFull, onFull } = options || {};

  const onExitFullRef = useRef(onExitFull);
  onExitFullRef.current = onExitFull;

  const onFullRef = useRef(onFull);
  onFullRef.current = onFull;

  const element = useRef<T>();

  const { state, toggle, setTrue, setFalse } = useBoolean(false);

  useLayoutEffect(() => {
    /* 非全屏时，不需要监听任何全屏事件 */
    if (!state) {
      return;
    }

    const passedInElement = typeof dom === 'function' ? dom() : dom;
    const targetElement = passedInElement || element.current;
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
  }, [state, typeof dom === 'function' ? undefined : dom]);

  const toggleFull = () => toggle();

  const result: Result<T> = {
    isFullscreen: !!state,
    setFull: setTrue,
    exitFull: setFalse,
    toggleFull,
  };

  if (!dom) {
    result.ref = element as MutableRefObject<T>;
  }

  return result;
};
