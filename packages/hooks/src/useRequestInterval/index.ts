import { useEffect } from 'react';
import useLatest from '../useLatest';

const requestInterval = function (callback: Function, delay: number = 0) {
  let start = new Date().getTime();
  let handle = {
    id: 0,
  };
  const loop = () => {
    const current = new Date().getTime();
    if (current - start > delay) {
      callback(); // 执行回调
      start = new Date().getTime();
    }
    handle.id = requestAnimationFrame(loop);
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
};

const clearRequestInterval = function (handle: any) {
  cancelAnimationFrame(handle.id);
};

function useRequestInterval(
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
    const timer = requestInterval(() => {
      fnRef.current();
    }, delay);
    return () => {
      clearRequestInterval(timer);
    };
  }, [delay]);
}

export default useRequestInterval;
