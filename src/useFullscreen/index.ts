import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import screenfull from 'screenfull';

export interface Options<T> {
  dom?: T | (() => T) | null;
  onExitFull?: () => void;
  onFull?: () => void;
}

export interface Result<T> {
  isFullscreen: boolean;
  setFull: () => void;
  exitFull: () => void;
  ref?: MutableRefObject<T>;
}

export default <T extends HTMLElement = HTMLElement>(options?: Options<T>): Result<T> => {
  const { dom, onExitFull, onFull } = options || {};

  const onExitFullRef = useRef(onExitFull);
  onExitFullRef.current = onExitFull;

  const onFullRef = useRef(onFull);
  onFullRef.current = onFull;

  const element = useRef<T>();

  const [state, setState] = useState(false);

  const onChange = useCallback(() => {
    if (screenfull.isEnabled) {
      const { isFullscreen } = screenfull;
      setState(isFullscreen);
      if (isFullscreen && onFullRef.current) {
        onFullRef.current();
      }
      if (!isFullscreen && onExitFullRef.current) {
        onExitFullRef.current();
      }
    }
  }, []);

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', onChange);
    }
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', onChange);
      }
    };
  }, [onChange]);

  const setFull = useCallback(() => {
    const passedInElement = typeof dom === 'function' ? dom() : dom;
    const targetElement = passedInElement || element.current;
    if (!targetElement) {
      return;
    }
    if (screenfull.isEnabled) {
      screenfull.request(targetElement);
    }
  }, [typeof dom === 'function' ? undefined : dom]);

  const exitFull = useCallback(() => {
    const passedInElement = typeof dom === 'function' ? dom() : dom;
    const targetElement = passedInElement || element.current;
    if (!targetElement) {
      return;
    }
    if (screenfull.isEnabled) {
      screenfull.exit();
    }
  }, [typeof dom === 'function' ? undefined : dom]);

  const result: Result<T> = {
    isFullscreen: state,
    setFull,
    exitFull,
  };

  if (!dom) {
    result.ref = element as MutableRefObject<T>;
  }

  return result;
};
