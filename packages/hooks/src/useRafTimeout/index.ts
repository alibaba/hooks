import { useEffect } from 'react';
import useLatest from '../useLatest';

interface Handle {
  id: number | NodeJS.Timeout;
}

const setRafTimeout = function (callback: () => void, delay: number = 16.7): Handle {
  if (typeof requestAnimationFrame === typeof undefined) {
    return {
      id: setTimeout(callback, delay),
    };
  }
  const handle: Handle = {
    id: 0,
  };

  const now = Date.now;
  let startTime = now();
  let endTime = startTime;

  const loop = () => {
    handle.id = requestAnimationFrame(loop);
    endTime = now();
    if (endTime - startTime >= delay) {
      callback();
      clearRafTimeout(handle);
    }
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
};

function cancelAnimationFrameIsNotDefined(t: any): t is NodeJS.Timer {
  return typeof cancelAnimationFrame === typeof undefined;
}

const clearRafTimeout = function (handle: Handle) {
  if (cancelAnimationFrameIsNotDefined(handle.id)) {
    return clearTimeout(handle.id);
  }
  cancelAnimationFrame(handle.id);
};

function useRafTimeout(fn: () => void, delay: number | undefined) {
  const fnRef = useLatest(fn);

  useEffect(() => {
    if (typeof delay !== 'number' || delay < 0) return;
    const timer = setRafTimeout(() => {
      fnRef.current();
    }, delay);
    return () => {
      clearRafTimeout(timer);
    };
  }, [delay]);
}

export default useRafTimeout;
