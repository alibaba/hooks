import { DependencyList, useCallback, useState, useRef, useEffect } from 'react';

class Timer<T> {
  private remaining = 0;

  private delay = 0;

  private cb: ((...args: any[]) => Promise<T | undefined>) | null = null;

  private start = 0;

  private timerId: any = 0;

  constructor(cb: () => Promise<T | undefined>, delay: number) {
    this.remaining = delay;
    this.delay = delay;
    this.start = delay;
    this.timerId = delay;
    this.cb = cb;
  }

  stop = () => {
    clearTimeout(this.timerId);
    this.timerId = 0;
    this.remaining = this.delay;
  };

  pause = () => {
    clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.start;
  };

  resume = (...args: any[]): Promise<T> | undefined => {
    this.start = Date.now();
    clearTimeout(this.timerId);
    if (this.cb) {
      return new Promise<T>(resolve => {
        this.timerId = setTimeout(async () => {
          if (this.cb) {
            this.cb(...(args || []));
            // resume 只触发定时器开始计时，没有返回结果
            resolve(
              'No resolve value when pollingInterval is set, please use onSuccess & onError instead' as any,
            );
          }
        }, this.remaining);
      });
    }
    return undefined;
  };
}

export interface Options<T> {
  manual?: boolean; // 是否初始化执行
  pollingInterval?: number; // 轮询的间隔毫秒
  onSuccess?: (d: T) => void; // 成功回调
  onError?: (e: Error) => void; // 失败回调
}

type noop = (...args: any[]) => void;
const noop: noop = () => {};

type promiseReturn<T> = (...args: any[]) => Promise<T | undefined>;
const promiseReturn: promiseReturn<any> = async () => null as any;

export interface ReturnValue<T> {
  loading: boolean;
  error?: Error;
  data?: T;
  cancel: noop;
  run: promiseReturn<T | undefined>;
  timer: {
    stop: noop;
    resume: noop;
    pause: noop;
  };
}
function useAsync<Result = any>(
  fn: (...args: any[]) => Promise<Result>,
  options?: Options<Result>,
): ReturnValue<Result>;
function useAsync<Result = any>(
  fn: (...args: any[]) => Promise<Result>,
  deps?: DependencyList,
  options?: Options<Result>,
): ReturnValue<Result>;
function useAsync<Result = any>(
  fn: (...args: any[]) => Promise<Result>,
  deps?: DependencyList | Options<Result>,
  options?: Options<Result>,
): ReturnValue<Result> {
  const _deps: DependencyList = (Array.isArray(deps) ? deps : []) as DependencyList;
  const _options: Options<Result> = (typeof deps === 'object' && !Array.isArray(deps)
    ? deps
    : options || {}) as Options<Result>;

  const [state, set] = useState<ReturnValue<Result>>({
    loading: false,
    cancel: noop,
    run: promiseReturn,
    timer: {
      stop: noop,
      resume: promiseReturn,
      pause: noop,
    },
  });
  const timer = useRef<Timer<Result> | undefined>(undefined);
  const count = useRef(0);
  const init = useRef(true);

  useEffect(() => {
    count.current += 1;
    init.current = true;
    return () => {
      count.current += 1;
    };
  }, _deps);

  const run = useCallback((...args: any[]): Promise<Result | undefined> => {
    // 确保不会返回被取消的结果
    const runCount = count.current;
    set(s => ({ ...s, loading: true }));
    return fn(...args)
      .then(data => {
        if (runCount === count.current) {
          if (_options.onSuccess) {
            _options.onSuccess(data);
          }
          if (runCount === count.current) {
            set(s => ({ ...s, data, loading: false }));
          }
        }
        return data;
      })
      .catch(error => {
        if (runCount === count.current) {
          if (_options.onError) {
            _options.onError(error);
          }
          if (runCount === count.current) {
            set(s => ({ ...s, error, loading: false }));
          }
        }
        return error;
      });
  }, _deps);

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

  const resume = useCallback(
    async (...args: any[]): Promise<Result | undefined> => {
      // 恢复计时器
      if (timer.current) {
        return timer.current.resume(...(args || []));
      }
      return undefined;
    },
    [run],
  );

  const start = useCallback(
    async (...args: any[]): Promise<Result | undefined> => {
      // 执行并开启计时器
      await run(...(args || []));
      return resume(...(args || []));
    },
    [run],
  );

  const intervalAsync = useCallback(
    async (...args: any[]) => {
      const runCount = count.current;
      let ret: Result | undefined;
      if (!_options.manual || !init.current) {
        ret = await run(...(args || []));
      }
      if (count.current === runCount) {
        // 只初始化定时器，不开始计时
        timer.current = new Timer<Result>(
          () => intervalAsync(...args),
          _options.pollingInterval as number,
        );
        // 如果设置了 manual，则默认不开始计时
        if (init.current && _options.manual) {
          // await run(...(args || []));
          init.current = false;
        } else {
          // 开始计时
          ret = await timer.current.resume(...(args || []));
        }
      }
      return ret;
    },
    [_options.pollingInterval, _options.manual, run],
  );

  const reload = useCallback(
    (...args: any[]): Promise<Result | undefined> => {
      // 防止上次数据返回
      count.current += 1;
      if (_options.pollingInterval) {
        if (!_options.manual) {
          // 如果有 polling，清理上次的计时器
          stop();
        }
        return intervalAsync(...args);
      }
      // 直接运行
      return run(...(args || []));
    },
    [run, _options.pollingInterval],
  );

  const cancel = useCallback(() => {
    count.current += 1;
    // throw an error
    set(s => ({ ...s, error: new Error('canceled'), loading: false }));
  }, []);

  useEffect(() => {
    if (_options.pollingInterval) {
      intervalAsync();
    } else if (!_options.manual) {
      // 直接执行
      run();
    }

    return () => {
      count.current += 1;
      stop();
    };
  }, [_options.manual, _options.pollingInterval, run, intervalAsync]);

  return {
    loading: state.loading,
    error: state.error,
    data: state.data,
    cancel,
    run: _options.manual && _options.pollingInterval ? start : reload,
    timer: {
      stop,
      resume,
      pause,
    },
  };
}

export default useAsync;
