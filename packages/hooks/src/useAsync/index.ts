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
    this.start = Date.now();
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

  resume = () => {
    this.start = Date.now();
    clearTimeout(this.timerId);
    this.timerId = setTimeout(async () => {
      if (this.cb) {
        this.cb();
      }
    }, this.remaining);
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
const noop: noop = () => { };

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
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const onSuccessRef = useRef(_options.onSuccess);
  onSuccessRef.current = _options.onSuccess;

  const onErrorRef = useRef(_options.onError);
  onErrorRef.current = _options.onError;

  // initial loading state is related to manual option
  const [state, set] = useState({
    data: undefined as (Result | undefined),
    error: undefined as (Error | string | undefined),
    loading: !_options.manual,
  });

  const run = useCallback((...args: any[]): Promise<Result | undefined> => {
    // 确保不会返回被取消的结果
    const runCount = count.current;
    /* 当前参数保存一下 */
    params.current = args;
    set(s => ({ ...s, loading: true }));
    return fnRef
      .current(...args)
      .then(data => {
        if (runCount === count.current) {
          set(s => ({ ...s, data, loading: false }));
          if (onSuccessRef.current) {
            onSuccessRef.current(data, args || []);
          }
        }
        return data;
      })
      .catch(error => {
        if (runCount === count.current) {
          set(s => ({ ...s, error, loading: false }));
          if (onErrorRef.current) {
            onErrorRef.current(error, args || []);
          }
        }
        throw error;
      });
  }, []);

  /* 软取消，由于竞态，需要取消上一次的请求 */
  const softCancel = useCallback(() => {
    if (autoCancel) {
      count.current += 1;
      set(s => ({ ...s, loading: false }));
    }
  }, [autoCancel]);

  /* 强制取消，组件卸载，或者用户手工取消 */
  const forceCancel = useCallback(() => {
    count.current += 1;
    set(s => ({ ...s, loading: false }));
  }, []);

  const stop = useCallback(() => {
    if (timer.current) {
      timer.current.stop();
      omitNextResume.current = true;
    }
    forceCancel();
  }, [forceCancel]);

  const resume = useCallback(() => {
    if (timer.current) {
      omitNextResume.current = false;
      timer.current.resume();
    }
  }, []);

  const pause = useCallback(() => {
    if (timer.current) {
      timer.current.pause();
      omitNextResume.current = true;
    }
    forceCancel();
  }, [forceCancel]);

  const start = useCallback(
    async (...args: any[]) => {
      // 有定时器的延时逻辑
      if (_options.pollingInterval) {
        if (timer.current) {
          stop();
        }
        omitNextResume.current = false;
        timer.current = new Timer<Result>(() => start(...args), _options.pollingInterval as number);
        const ret = run(...args);
        ret.finally(() => {
          if (timer.current && !omitNextResume.current) {
            timer.current.resume();
          }
        });
        return ret;
      }
      // 如果上一次异步操作还在 loading，则会尝试取消掉上一次的异步操作。
      softCancel();
      return run(...args);
    },
    [run, softCancel, stop, _options.pollingInterval],
  );

  useEffect(() => {
    if (!_options.manual) {
      // deps 变化时，重新执行
      start();
    }
    /* 如果 desp 变化，强制取消 */
    return () => {
      if (timer.current) {
        timer.current.stop();
      }
      forceCancel();
    };
  }, [..._deps, forceCancel, start]);

  return {
    loading: state.loading,
    params: params.current,
    error: state.error,
    data: state.data,
    cancel: forceCancel,
    run: start,
    timer: {
      stop,
      resume,
      pause,
    },
  };
}

export default useAsync;
