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
  onSuccess?: (data: T, params?: any[]) => void; // 成功回调
  onError?: (e: Error, params?: any[]) => void; // 失败回调
  autoCancel?: boolean; // 竞态处理开关
}

type noop = (...args: any[]) => void;
const noop: noop = () => {};

type promiseReturn<T> = (...args: any[]) => Promise<T | undefined>;
const promiseReturn: promiseReturn<any> = async () => null as any;

export interface ReturnValue<T> {
  loading: boolean;
  error?: Error | string;
  params: any[];
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

  const params = useRef<any[]>([]);
  const { autoCancel = true } = _options;
  const timer = useRef<Timer<Result> | undefined>(undefined);
  const omitNextResume = useRef(false);

  const count = useRef(0);
  // initial loading state is related to manual option
  const [state, set] = useState({
    data: {} as Result,
    error: '' as (Error | string),
    loading: !_options.manual,
  });

  const run = useCallback((...args: any[]): Promise<Result | undefined> => {
    // 确保不会返回被取消的结果
    const runCount = count.current;
    params.current = args;
    set(s => ({ ...s, loading: true }));
    return fn(...args)
      .then(data => {
        if (runCount === count.current) {
          if (_options.onSuccess) {
            _options.onSuccess(data);
          }
          // 需要重新判断 runCount，因为 onSuccess 中可能存在副作用
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
          // 需要重新判断 runCount，因为 onError 中可能存在副作用
          if (runCount === count.current) {
            set(s => ({ ...s, error, loading: false }));
          }
        }
        return error;
      });
  }, _deps);

  useEffect(() => () => {
      // possible memory leak!
      if (autoCancel) {
        count.current += 1;
      }
    }, _deps);

  const start = async (...args: any[]) => {
    // 有定时器的延时逻辑
    if (_options.pollingInterval) {
      timer.current = new Timer<Result>(() => start(...args), _options.pollingInterval as number);
      stop();
      const ret = run(...args);
      ret.finally(() => {
        if (timer.current && !omitNextResume.current) {
          timer.current.resume(...args);
        }
      });
      return ret;
    }
    // 没有定时器，直接执行

      return run(...args);
  };

  useEffect(() => {
    // 如果自动执行
    if (!_options.manual) {
      run();
    }
  }, [run, _options.manual]);

  const cancel = useCallback(() => {
    if (autoCancel) {
      count.current += 1;
    }
    set(s => ({ ...s, loading: false }));
  }, []);

  const stop = useCallback(() => {
    if (timer.current) {
      timer.current.stop();
      omitNextResume.current = true;
      cancel();
    }
  }, []);

  const resume = useCallback(() => {
    if (timer.current) {
      omitNextResume.current = false;
      timer.current.resume();
    }
  }, []);

  const pause = useCallback(() => {
    if (timer.current) {
      timer.current.pause();
      cancel();
    }
  }, []);

  return {
    loading: state.loading,
    params: params.current,
    error: state.error,
    data: state.data,
    cancel,
    run: start,
    timer: {
      stop,
      resume,
      pause,
    },
  };
}

export default useAsync;
