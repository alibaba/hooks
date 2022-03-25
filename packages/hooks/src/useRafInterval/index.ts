import { useEffect } from 'react';
import useLatest from '../useLatest';

interface Handle {
  id: number;
}

const setRafInterval = function (callback: () => void, delay: number = 0) {
  if (typeof requestAnimationFrame === typeof undefined) {
    return setInterval(callback, delay);
  }
  let start = new Date().getTime();
  const handle: Handle | number = {
    id: 0,
  };
  const loop = () => {
    const current = new Date().getTime();
    if (current - start >= delay) {
      callback(); // 执行回调
      start = new Date().getTime();
    }
    handle.id = requestAnimationFrame(loop);
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
};

const clearRafInterval = function (handle: Handle) {
  if (typeof cancelAnimationFrame === typeof undefined) {
    return clearInterval(handle as any);
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

  useEffect(() => {
    if (typeof delay !== 'number' || delay < 0) return;
    if (immediate) {
      fnRef.current();
    }
    const timer = setRafInterval(() => {
      fnRef.current();
    }, delay);
    return () => {
      clearRafInterval(timer as any);
    };
  }, [delay]);
}

export default useRafInterval;
