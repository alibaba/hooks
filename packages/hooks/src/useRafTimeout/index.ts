import { useCallback, useEffect, useRef } from 'react';
import useLatest from '../useLatest';
import { isNumber } from '../utils';

interface Handle {
  id: ReturnType<typeof setTimeout> | ReturnType<typeof requestAnimationFrame>;
}

const setRafTimeout = (callback: () => void, delay: number = 0): Handle => {
  if (typeof requestAnimationFrame === 'undefined') {
    return {
      id: setTimeout(callback, delay),
    };
  }

  const handle: Handle = {
    id: 0,
  };

  const startTime = Date.now();

  const loop = () => {
    const current = Date.now();
    if (current - startTime >= delay) {
      callback();
    } else {
      handle.id = requestAnimationFrame(loop);
    }
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
};

const cancelAnimationFrameIsNotDefined = (t: any): t is ReturnType<typeof setTimeout> => {
  return typeof cancelAnimationFrame === 'undefined';
};

const clearRafTimeout = (handle: Handle) => {
  if (cancelAnimationFrameIsNotDefined(handle.id)) {
    return clearTimeout(handle.id);
  }
  cancelAnimationFrame(handle.id);
};

function useRafTimeout(fn: () => void, delay: number | undefined) {
  const fnRef = useLatest(fn);
  const timerRef = useRef<Handle>(undefined);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearRafTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) {
      return;
    }
    timerRef.current = setRafTimeout(() => {
      fnRef.current();
    }, delay);
    return clear;
  }, [delay]);

  return clear;
}

export default useRafTimeout;
