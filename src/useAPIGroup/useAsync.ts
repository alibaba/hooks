import { useCallback, useEffect, useRef, useState } from 'react';
import { BaseOptions, OptionsWithFormat, Options, BaseResult } from './types';

const DEFAULT_KEY = 'USE_API_GROUP_DEFAULT_KEY';

function useAsync<R, P extends any[], U, UU extends U = any>(
  service: (...args: P) => Promise<R>,
  options: OptionsWithFormat<R, P, U, UU>
): BaseResult<U, P>
function useAsync<R, P extends any[]>(
  service: (...args: P) => Promise<R>,
  options?: BaseOptions<R, P>
): BaseResult<R, P>
function useAsync<R, P extends any[], U, UU extends U = any>(
  service: (...args: P) => Promise<R>,
  options?: Options<R, P, U, UU>
) {

  const _options: Options<R, P, U, UU> = options || ({} as Options<R, P, U, UU>);

  const {
    refreshDeps = [],
    manual = false,
    onSuccess,
    onError,
    pollingInterval = 0,
    defaultParams = [],

    fetchKey,
  } = _options;
  
  // 是否卸载
  const unmountFlag = useRef(false);

  // 时序控制，每一次请求都有一个唯一的编号
  const count = useRef(0);

  // 每一类请求都有一个唯一的 Key, newsKey 代表最新的那一类的 key
  // key 是由用户输入的 fetchKey 生成的
  const newstKey = useRef<string | number>(DEFAULT_KEY);

  // key 与 count 的对应关系，每一类 key 只有最新的 count 才有效
  const runKeyCount = useRef<any>({});

  /* 根据 key，取消某一类 history */
  const cancelHistory = useCallback((key) => {
    // key 对应的 count 为 -1，就不会处理响应结果了，相当于取消
    runKeyCount.current[key] = -1;
    setHistory((s: any) => {
      s[key] = {
        ...s[key],
        loading: false
      }
      return { ...s };
    });
  }, []);

  // 请求历史
  const [history, setHistory] = useState<any>({
    [DEFAULT_KEY]: {
      params: [] as any[],
      data: undefined as (R | U | undefined),
      error: undefined as (Error | undefined),
      loading: !manual,
      cancel: () => { cancelHistory(DEFAULT_KEY) },
      refresh: () => { refreshHistory(DEFAULT_KEY) }
    }
  });

  // 定时器
  const timerRef = useRef<any>();

  // 防止调用函数时，产生 capture value 问题
  const serviceRef = useRef(service);
  serviceRef.current = service;

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const fetchKeyRef = useRef(fetchKey);
  fetchKeyRef.current = fetchKey;

  const formatResultRef = useRef<any>();
  if ("formatResult" in _options) {
    formatResultRef.current = _options.formatResult;
  }

  // 卸载
  const unmount = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    unmountFlag.current = true;
  }, []);

  const stopPolling = useCallback(() => {
    // 取消当前正在等待的定时器
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // 取消即将来临的定时器
    count.current += 1;
  }, []);

  const run = useCallback((...args: P) => {
    // 取消已有定时器
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // 请求编号加一
    count.current += 1;
    // 闭包存储当前请求 count
    const runCount = count.current;

    // 读取当前最新 newstKey
    if (fetchKeyRef.current) {
      newstKey.current = fetchKeyRef.current(...args);
    }
    // 闭包存储当前请求 分类 key
    const runKey = newstKey.current;

    // 记录该 runKey 下最新的 runCount，同一个 runKey，老的 runCount 均需要废弃
    runKeyCount.current[runKey] = runCount;
    setHistory((s: any) => {
      s[runKey] = {
        data: undefined,
        error: undefined,
        ...(s[runKey] || {}),
        loading: true,
        params: args,
        cancel: () => {
          cancelHistory(runKey);
        },
        refresh: () => {
          run(...args);
        }
      }
      return { ...s }
    });

    return serviceRef.current(...args).then(res => {

      // 同一个 runKey，只有最新的 count 才会响应 
      if (!unmountFlag.current && runCount === runKeyCount.current[runKey]) {
        const formattedResult = formatResultRef.current ? formatResultRef.current(res) : res;
        setHistory((s: any) => {
          s[runKey] = {
            ...(s[runKey] || {}),
            loading: false,
            error: undefined,
            data: formattedResult,
          }
          return { ...s }
        });
        if (onSuccessRef.current) {
          onSuccessRef.current(formattedResult, args);
        }
        return formattedResult;
      }
    }).catch(error => {
      if (!unmountFlag.current && runCount === runKeyCount.current[runKey]) {
        setHistory((s: any) => {
          s[runKey] = {
            ...(s[runKey] || {}),
            loading: false,
            error,
            data: undefined,
          }
          return { ...s }
        });
        if (onErrorRef.current) {
          onErrorRef.current(error, args);
        }
        throw error;
      }
    }).finally(() => {
      // 只有最新的请求，不管是哪个分类，才有资格 setTimeout
      if (!unmountFlag.current && pollingInterval && runCount === count.current) {
        timerRef.current = setTimeout(() => {
          run(...args);
        }, pollingInterval);
      }
    });
  }, [pollingInterval, cancelHistory]);

  /* refresh 某个 history */
  const refreshHistory = useCallback((key) => {
    run(...history[key].params);
  }, [run]);

  useEffect(() => {
    if (!manual) {
      // 如果是自动执行的，run 是没有参数的
      run(...defaultParams as any);
    }
  }, [...refreshDeps, run]);

  // 卸载组件触发
  useEffect(() => {
    return unmount;
  }, []);

  return {
    ...history[newstKey.current],
    stopPolling,
    run,
    history
  } as BaseResult<U, P>
}

export default useAsync;