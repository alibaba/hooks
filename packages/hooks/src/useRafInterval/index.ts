import { useCallback, useEffect, useRef } from 'react';
import useLatest from '../useLatest';
import { isNumber } from '../utils';

interface Handle {
  id: ReturnType<typeof setInterval> | ReturnType<typeof requestAnimationFrame>;
}

const setRafInterval = (callback: () => void, delay: number = 0): Handle => {
  if (typeof requestAnimationFrame === 'undefined') {
    return {
      id: setInterval(callback, delay),
    };
  }
  let start = Date.now();
  const handle: Handle = {
    id: 0,
  };
  const loop = () => {
    const current = Date.now();
    if (current - start >= delay) {
      callback();
      start = Date.now();
    }
    handle.id = requestAnimationFrame(loop);
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
};

const cancelAnimationFrameIsNotDefined = (t: any): t is ReturnType<typeof setTimeout> => {
  return typeof cancelAnimationFrame === 'undefined';
};

const clearRafInterval = (handle: Handle) => {
  if (cancelAnimationFrameIsNotDefined(handle.id)) {
    return clearInterval(handle.id);
  }
  cancelAnimationFrame(handle.id);
};

function useRafInterval(
  fn: () => void,
  delay: number | undefined,
  options?: {
    immediate?: boolean;
  },
) {
  const immediate = options?.immediate;

  const fnRef = useLatest(fn);
  const timerRef = useRef<Handle>(undefined);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearRafInterval(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) {
      return;
    }
    if (immediate) {
      fnRef.current();
    }
    timerRef.current = setRafInterval(() => {
      fnRef.current();
    }, delay);
    return clear;
  }, [delay]);

  return clear;
}

export default useRafInterval;
