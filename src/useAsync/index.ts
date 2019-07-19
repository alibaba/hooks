import { DependencyList, useCallback, useState, useRef, useEffect } from 'react';

class Timer {
  private remaining: number = 0;

  private delay: number = 0;

  private cb: (() => void) | null = null;

  private start: number = 0;

  private timerId: number = 0;

  constructor(cb: () => void, delay: number) {
    this.remaining = delay;
    this.delay = delay;
    this.start = delay;
    this.timerId = delay;
    this.cb = cb;
    this.resume();
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

  resume = () => {
    this.start = Date.now();
    window.clearTimeout(this.timerId);
    if (this.cb) {
      this.timerId = window.setTimeout(this.cb, this.remaining);
    }
  };
}

export interface Options {
  initExecute?: boolean; // 是否初始化执行
  pollingInterval?: number; // 轮询的间隔毫秒
}

const nullFunc: () => void = () => {};
type nullFunc = () => void;

export interface ReturnValue<T> {
  loading: boolean;
  error?: Error;
  data?: T;
  cancel: nullFunc;
  run: nullFunc;
  timer: {
    stop: nullFunc;
    resume: nullFunc;
    pause: nullFunc;
  };
}

export default function useAsync<Result = any, Args extends any = any[]>(
  fn: (...args: Args | any) => Promise<Result>,
  deps: DependencyList = [],
  options: Options = {},
): ReturnValue<Result> {
  const [state, set] = useState<ReturnValue<Result>>({
    loading: true,
    cancel: nullFunc,
    run: nullFunc,
    timer: {
      stop: nullFunc,
      resume: nullFunc,
      pause: nullFunc,
    },
  });
  const timer = useRef<Timer | undefined>(undefined);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const run = useCallback((...args: Args | any) => {
    set(s => ({ ...s, loading: true }));

    return fn(...args)
      .then(data => {
        if (mounted.current) {
          set(s => ({ ...s, data, loading: false }));
        }
        return data;
      })
      .catch(error => {
        if (mounted.current) {
          set(s => ({ ...s, error, loading: false }));
        }
        return error;
      });
  }, deps);

  const reload = useCallback(() => {
    mounted.current = true;
    run();
  }, [run]);

  const cancel = useCallback(() => {
    mounted.current = false;
  }, []);

  const stop = useCallback(() => {
    mounted.current = false;
    // 清除计时器
    if (timer.current) {
      timer.current.stop();
    }
  }, []);

  const pause = useCallback(() => {
    mounted.current = false;
    // 暂停计时器
    if (timer.current) {
      timer.current.pause();
    }
  }, []);

  const resume = useCallback(() => {
    mounted.current = true;
    // 恢复计时器
    if (timer.current) {
      timer.current.resume();
    }
  }, []);

  useEffect(() => {
    if (options.pollingInterval) {
      const intervalAsync = async () => {
        await run();
        if (mounted.current) {
          timer.current = new Timer(
            () => {
              intervalAsync();
            },
            options.pollingInterval as number,
          );
        }
      };
      intervalAsync();
    } else if (options.initExecute) {
      run();
    }
    return () => {
      stop();
    };
  }, [options.initExecute, options.pollingInterval, run]);

  return {
    loading: state.loading,
    error: state.error,
    data: state.data,
    cancel,
    run: reload,
    timer: {
      stop,
      resume,
      pause,
    },
  };
}
