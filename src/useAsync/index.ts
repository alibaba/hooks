import { DependencyList, useCallback, useState, useRef, useEffect } from 'react';

class Timer {
  private remaining: number = 0;

  private delay: number = 0;

  private cb: ((...args: any[]) => void) | null = null;

  private start: number = 0;

  private timerId: number = 0;

  constructor(cb: () => void, delay: number) {
    this.remaining = delay;
    this.delay = delay;
    this.start = delay;
    this.timerId = delay;
    this.cb = cb;
  }

  stop = () => {
    window.clearTimeout(this.timerId);
    this.timerId = 0;
    this.remaining = this.delay;
  };

  pause = () => {
    window.clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.start;
  };

  resume = (...args: any[]) => {
    this.start = Date.now();
    window.clearTimeout(this.timerId);
    if (this.cb) {
      this.timerId = window.setTimeout(() => {
        if (this.cb) {
          this.cb(...(args || []));
        }
      }, this.remaining);
    }
  };
}

export interface Options<T> {
  manual?: boolean; // 是否初始化执行
  pollingInterval?: number; // 轮询的间隔毫秒
  onSuccess?: (d: T) => void;
  onError?: (e: Error) => void;
}

type noop = (...args: any[]) => void;
const noop: noop = () => {};

export interface ReturnValue<T> {
  loading: boolean;
  error?: Error;
  data?: T;
  cancel: noop;
  run: noop;
  timer: {
    stop: noop;
    resume: noop;
    pause: noop;
  };
}

export default function useAsync<Result = any>(
  fn: (...args: any[]) => Promise<Result>,
  deps: DependencyList = [],
  options: Options<Result> = {},
): ReturnValue<Result> {
  const [state, set] = useState<ReturnValue<Result>>({
    loading: false,
    cancel: noop,
    run: noop,
    timer: {
      stop: noop,
      resume: noop,
      pause: noop,
    },
  });
  const timer = useRef<Timer | undefined>(undefined);
  const count = useRef(0);
  const init = useRef(true);

  useEffect(() => {
    count.current += 1;
    init.current = true;
    return () => {
      count.current += 1;
    };
  }, deps);

  const stop = useCallback(() => {
    count.current += 1;
    // 清除计时器
    if (timer.current) {
      timer.current.stop();
    }
    set(s => ({ ...s, error: new Error('stopped'), loading: false }));
  }, []);

  const pause = useCallback(() => {
    count.current += 1;
    // 暂停计时器
    if (timer.current) {
      timer.current.pause();
    }
    set(s => ({ ...s, error: new Error('paused'), loading: false }));
  }, []);

  const resume = useCallback((...args) => {
    // 恢复计时器
    if (timer.current) {
      timer.current.resume(...(args || []));
    }
  }, []);

  const run = useCallback((...args: any[]) => {
    // 确保不会返回被取消的结果
    const runCount = count.current;
    set(s => ({ ...s, loading: true }));
    return fn(...args)
      .then(data => {
        if (runCount === count.current) {
          if (options.onSuccess) {
            options.onSuccess(data);
          }
          set(s => ({ ...s, data, loading: false }));
        }
        return data;
      })
      .catch(error => {
        console.log('useAsync', error);
        if (runCount === count.current) {
          if (options.onError) {
            options.onError(error);
          }
          set(s => ({ ...s, error, loading: false }));
        }
        return error;
      });
  }, deps);

  const intervalAsync = useCallback(
    async (...args) => {
      const runCount = count.current;
      if (!options.manual || !init.current) {
        await run(...(args || []));
      }
      if (count.current === runCount) {
        // 只初始化定时器，不开始计时
        timer.current = new Timer(() => intervalAsync(...args), options.pollingInterval as number);

        // 如果设置了 manual，则默认不开始计时
        if (init.current && options.manual) {
          init.current = false;
        } else {
          // 开始计时
          timer.current.resume(...(args || []));
        }
      }
    },
    [options.pollingInterval, options.manual, run],
  );

  const reload = useCallback(
    (...args) => {
      // 防止上次数据返回
      count.current += 1;
      if (options.pollingInterval) {
        if (!options.manual) {
          // 如果有 polling，清理上次的计时器
          stop();
        }
        intervalAsync(...args);
      } else {
        // 直接运行
        run(...(args || []));
      }
    },
    [run, options.pollingInterval],
  );

  const cancel = useCallback(() => {
    count.current += 1;
    // throw an error
    set(s => ({ ...s, error: new Error('canceled'), loading: false }));
  }, []);

  useEffect(
    (...args: any[]) => {
      if (options.pollingInterval) {
        intervalAsync();
      } else if (!options.manual) {
        // 直接值行
        run(...(args || []));
      }

      return () => {
        count.current += 1;
        stop();
      };
    },
    [options.manual, options.pollingInterval, run, intervalAsync],
  );

  return {
    loading: state.loading,
    error: state.error,
    data: state.data,
    cancel,
    run: options.manual && options.pollingInterval ? resume : reload,
    timer: {
      stop,
      resume,
      pause,
    },
  };
}
