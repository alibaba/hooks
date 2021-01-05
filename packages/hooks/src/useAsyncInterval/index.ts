import { useRef, useEffect } from 'react';

export default (
  fn: () => Promise<void>,
  delay: number | null | undefined,
  options?: {
    immediate?: boolean;
  },
) => {
  const immediate = options?.immediate;

  const fnRef = useRef<() => void>();
  fnRef.current = fn;

  // setTimeout 的闭包内部需要做根据外部属性做逻辑判断，使用 ref 避免闭包内部拿不到值
  const delayRef = useRef(delay);
  delayRef.current = delay;

  useEffect(() => {
    if (delay === undefined || delay === null) return;
    if (immediate) {
      fnRef.current?.();
    }
    let timer;
    (function exec() {
      timer = setTimeout(async () => {
        // 当 delay 更新时，应该阻止上一轮的 callback 继续执行
        if (delay === delayRef.current) {
          await fnRef.current?.();
          exec();
        }
      }, delay);
    })();
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);
};
