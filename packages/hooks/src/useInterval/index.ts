import { useEffect, useRef } from 'react';
import usePrevious from '../usePrevious';

function useInterval(
  fn: () => void | Promise<void>,
  delay: number | null | undefined,
  options?: {
    immediate?: boolean;
    iterate?: boolean;
  },
): void {
  const immediate = options?.immediate;

  const fnRef = useRef<() => void>();
  fnRef.current = fn;

  const preDelay = usePrevious(delay);
  // setTimeout 的闭包内部需要做根据外部属性做逻辑判断，使用 ref 避免闭包内部拿不到值
  const memoRef = useRef({ preDelay: preDelay, delay });

  useEffect(() => {
    memoRef.current.preDelay = preDelay;
  }, [preDelay]);

  useEffect(() => {
    memoRef.current.delay = delay;
    if (delay === undefined || delay === null) return;
    if (immediate) {
      fnRef.current?.();
    }
    let timer: NodeJS.Timeout;

    if (options?.iterate) {
      (function start() {
        timer = setTimeout(async () => {
          // 当 delay 更新时，应该阻止上一轮的 callback 继续执行
          if (memoRef.current.preDelay && memoRef.current.preDelay !== memoRef.current.delay)
            return;
          await fnRef.current?.();
          start();
        }, delay);
      })();
    } else {
      timer = setInterval(() => {
        fnRef.current?.();
      }, delay);
    }
    return () => {
      console.log('clear>>>>');
      if (options?.iterate) {
        clearTimeout(timer);
      } else {
        clearInterval(timer);
      }
    };
  }, [delay]);
}

export default useInterval;
