import { useEffect } from 'react';
import useLatest from '../useLatest';

interface Handle {
  id: number;
}

const setRafInterval = function (callback: () => void, delay: number = 0) {
  let start = new Date().getTime();
  const handle: Handle = {
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
      clearRafInterval(timer);
    };
  }, [delay]);
}

export default useRafInterval;
