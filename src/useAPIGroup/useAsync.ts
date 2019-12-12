import { useCallback, useEffect, useRef, useState } from 'react';
import { BaseOptions, OptionsWithFormat, Options, BaseResult } from './types';


function useAsync<T, K extends any[], U>(
  service: (...args: K) => Promise<T>,
  options: OptionsWithFormat<T, K, U>
): BaseResult<U, K>
function useAsync<T, K extends any[]>(
  service: (...args: K) => Promise<T>,
  options: BaseOptions<T, K>
): BaseResult<T, K>
function useAsync<T, K extends any[], U>(
  service: (...args: K) => Promise<T>,
  options: Options<T, K, U>
) {

  const {
    refreshDeps = [],
    manual = false,
    onSuccess,
    onError,
    autoCancel = true,
    pollingInterval = 0,
    defaultParams = []
  } = options;

  const params = useRef<K | undefined>();
  // 时序控制，每一次请求都有一个编号
  const count = useRef(0);
  // 有些请求被强制取消掉了，这里记录一下
  const cancelCount = useRef<number[]>([]);

  // 定时器
  const timerRef = useRef<any>();

  // 防止调用函数时，产生 capture value 问题
  const serviceRef = useRef(service);
  serviceRef.current = service;

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const formatResultRef = useRef<any>();
  if ("formatResult" in options) {
    formatResultRef.current = options.formatResult;
  }


  const [state, setState] = useState({
    data: undefined as (T | U | undefined),
    error: undefined as (Error | undefined),
    loading: !manual,
  });

  // 取消，分为强制取消和非强制取消
  const cancel = useCallback((force: boolean = false) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // 如果强制取消，立即停止 loading
    if (force || autoCancel) {
      cancelCount.current.push(count.current);
      setState(s => ({ ...s, loading: false }));
    }
    count.current += 1;
  }, [autoCancel]);

  const run = useCallback((...args: K) => {
    // 取消上一次请求（及定时器）
    cancel();
    // 存储当前 count
    const runCount = count.current;
    // 保存当前参数
    params.current = args;
    setState(s => ({ ...s, loading: true }));

    return serviceRef.current(...args).then(res => {
      const formattedResult = formatResultRef.current ? formatResultRef.current(res) : res;
      if (!cancelCount.current.includes(runCount)) {
        setState(s => ({ ...s, error: undefined, data: formattedResult, loading: false }));
        if (onSuccessRef.current) {
          onSuccessRef.current(formattedResult, args);
        }
      }
      return formattedResult;
    }).catch(error => {
      if (!cancelCount.current.includes(runCount)) {
        setState(s => ({ ...s, data: undefined, error, loading: false }));
        if (onErrorRef.current) {
          onErrorRef.current(error, args);
        }
      }
      throw error;
    }).finally(() => {
      // 只有最新的请求，才有资格 setTimeout
      if (pollingInterval && runCount === count.current) {
        timerRef.current = setTimeout(() => {
          run(...args);
        }, pollingInterval);
      }
    });
  }, [pollingInterval, cancel]);

  /* 用之前的参数重新请求一次 */
  const refresh = useCallback(() => {
    // todo 如果没有 run 过，不允许 refresh
    run(...params.current as any);
  }, [run]);

  useEffect(() => {
    if (!manual) {
      // 如果是自动执行的， run 是没有参数的
      run(...defaultParams as any);
    }
    // 如果 desp 变化, 或者组件卸载，强制取消
    return () => {
      cancel(true)
    };
  }, [...refreshDeps, run]);

  return {
    loading: state.loading,
    data: state.data,
    error: state.error,
    run,
    refresh,
    params: params.current,
    cancel: () => { cancel(true) },
  }
}

export default useAsync;