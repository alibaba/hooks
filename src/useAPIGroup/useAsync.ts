/**
 * useAsync
 * 我们先预设一下场景：
 * 1. 一个 useAsync 会被触发很多次，发多次请求。
 *    1.1 有些时候我们只希望保存最新请求的状态，也就是新的请求一定会覆盖旧的请求。
 *    1.2 有些时候我们希望保存每一次请求的状态，比如我们一般执行“删除”操作，同时删除 n 条，我们并不希望将请求合并。
 * 2. 如果有轮询，并且同时触发了多次 run，一定是以最后一次请求为基准的。也就是，新的请求会取消之前的轮询。
 *
 * 基于以上的假设，我们看下实现原理
 * history & fetchKey: 以 key 分类，记录所有的请求。
 *    - history 是一个 object，会记录每一类的请求状态（注意不是每一次，是每一类）
 *    - 默认情况下 history 只存在一类：DEFAULT_KEY
 *    - 用户可以通过 fetchkey 来设置当前请求的分类。fetchKey 是一个函数，接收当前请求的 params。
 *    - ！！！ 默认 data/error/loading 等，等于最新的 history，通过 newstKey 来记录哪个是最新的请求。
 * count: 每一次请求，都有一个编号。
 *    - 只有最新的请求，在结束后，才允许触发轮询。
 *    - 每一类（同一 key）请求，只有最新的才会生效。也就是同一类请求，也会存在覆盖关系。通过 runKeyCount 记录 key 与 count 的对应关系。
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import useUpdateEffect from '../useUpdateEffect';
import { BaseOptions, BaseResult, Options, OptionsWithFormat } from './types';
import useLimitFn from './utils/useLimitFn';
import subscribeFocus from './utils/windowFocus';
import subscribeVisible, { isDocumentVisible } from './utils/windowVisible';
import { getCache, setCache } from './utils/cache';
import useDebounceFn from '../useDebounceFn';
import useThrottleFn from '../useThrottleFn';

const DEFAULT_KEY = 'UMI_HOOKS_USE_API_DEFAULT_KEY';

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
    extraCacheDeps = [],
    manual = false,
    onSuccess,
    onError,
    pollingInterval = 0,
    pollingWhenHidden = true,

    defaultParams = [],
    refreshOnWindowFocus = false,
    focusTimespan = 5000,
    fetchKey,
    cacheKey,
    // staleTime = 2000,
    debounceInterval = 0,
    throttleInterval = 0
  } = _options;

  // 是否卸载
  const unmountFlag = useRef(false);
  // 屏幕 visible 后，是否需要开启定时器
  const pollingWhenVisibleFlag = useRef(false);

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

  // 时序控制，每一次请求都有一个唯一的编号
  const count = useRef(0);

  // 每一类请求都有一个唯一的 Key, newstKey 代表最新的那一类的 key
  // key 是由用户输入的 fetchKey 生成的
  const newstKey = useRef<string | number>(DEFAULT_KEY);

  // key 与 count 的对应关系，每一类 key 只有最新的 count 才有效
  // {[key:string]: number}
  const runKeyCount = useRef<any>({});

  const getCacheGroupKey = useCallback((...args: any[]) => {
    if (!cacheKey) {
      return null;
    }
    return JSON.stringify([cacheKey, ...args, ...refreshDeps, ...extraCacheDeps]);
  }, [cacheKey, refreshDeps, extraCacheDeps]);

  // 请求历史
  const [history, setHistory] = useState<any>(() => {

    let initCacheData;
    // 如果是自动执行的，初始化的时候读缓存的数据
    if (!manual && cacheKey) {
      const cacheRes = getCache(getCacheGroupKey(...defaultParams) as string);
      if (cacheRes) {
        initCacheData = formatResultRef.current ? formatResultRef.current(cacheRes) : cacheRes;
      }
    }

    return {
      [DEFAULT_KEY]: {
        params: [] as any[],
        data: initCacheData,
        error: undefined as (Error | undefined),
        loading: !manual,
        cancel: () => { cancelProxyRef.current(DEFAULT_KEY) },
        refresh: () => { refreshRef.current(DEFAULT_KEY) }
      }
    }
  });

  const historyRef = useRef(history);
  historyRef.current = history;

  const runProxyRef = useRef<any>();
  const cancelProxyRef = useRef<any>();
  const refreshRef = useRef<any>();
  // refresh 某个 history
  const refresh = useCallback((key) => {
    runProxyRef.current(...historyRef.current[key].params);
  }, []);
  refreshRef.current = refresh;

  /* 根据 key，取消某一类 history */
  const cancel = useCallback((key) => {
    // count 为 -1，就不会处理响应结果了，相当于取消。因为正在执行的请求, count 永远不可能等于 -1。
    runKeyCount.current[key] = -1;
    setHistory((s: any) => {
      s[key] = {
        ...s[key],
        loading: false,
      }
      return { ...s };
    });
  }, []);

  // 停止轮询
  const stopPolling = useCallback(() => {
    // 取消当前正在等待的定时器
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // 取消即将来临的定时器。因为只有最新的 count，在请求结束后，才允许触发定时器。count+1 后，就没任何请求是最新的了。
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

    // 记录该 runKey 下最新的 count，同一个 runKey，老的 count 均需要废弃
    runKeyCount.current[runKey] = runCount;

    // 从缓存读数据
    let cacheData: R;
    const cacheGroupKey = getCacheGroupKey(...args);
    if (cacheGroupKey) {
      const cacheRes = getCache(cacheGroupKey);
      if (cacheRes) {
        cacheData = formatResultRef.current ? formatResultRef.current(cacheRes) : cacheRes;
      }
    }

    setHistory((s: any) => {
      s[runKey] = {
        data: cacheData || s[runKey]?.data || undefined,
        error: s[runKey]?.error || undefined,
        loading: true,
        params: args,
        cancel: () => {
          cancelProxyRef.current(runKey);
        },
        refresh: () => {
          refreshRef.current(runKey);
        }
      }
      return { ...s }
    });

    return serviceRef.current(...args).then(res => {
      // 同一个 runKey，只有最新的 count 才会响应 
      if (!unmountFlag.current && runCount === runKeyCount.current[runKey]) {

        if (cacheGroupKey) {
          setCache(cacheGroupKey, res);
        }

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
        // 如果屏幕隐藏，并且 !pollingWhenHidden, 则停止轮询，并记录 flag，等 visible 时，继续轮询
        if (!isDocumentVisible() && !pollingWhenHidden) {
          pollingWhenVisibleFlag.current = true;
          return;
        }
        timerRef.current = setTimeout(() => {
          refreshRef.current(runKey);
        }, pollingInterval);
      }
    });
  }, [pollingInterval, pollingWhenHidden, getCacheGroupKey]);

  const runDebounce = useDebounceFn(run, debounceInterval);
  const runThrottle = useThrottleFn(run, throttleInterval);

  const runProxy = useCallback((...args: P) => {
    if (debounceInterval) {
      runDebounce.run(...args);
      return;
    }
    if (throttleInterval) {
      runThrottle.run(...args);
      return;
    }
    run(...args);
  }, [run, runDebounce, runThrottle]);

  runProxyRef.current = runProxy;

  const cancelProxy = useCallback((key: any) => {
    if (runDebounce) {
      runDebounce.cancel();
    }
    if (runThrottle) {
      runThrottle.cancel();
    }
    cancel(key);
  }, [cancel, runDebounce, runThrottle]);

  cancelProxyRef.current = cancelProxy;

  /*------------- polling start ---------------*/
  const rePolling = useCallback(() => {
    if (pollingWhenVisibleFlag.current) {
      pollingWhenVisibleFlag.current = false;
      timerRef.current = setTimeout(() => {
        refreshRef.current(newstKey.current);
      }, pollingInterval);
    }
  }, []);
  useEffect(() => {
    if (pollingInterval) {
      return subscribeVisible(rePolling);
    }
  }, []);
  /*------------- polling end ---------------*/

  /*------------- refreshOnFocus start ---------------*/
  const reFreshOnFocus = useLimitFn(() => {
    refreshRef.current(newstKey.current);
  }, focusTimespan);
  useEffect(() => {
    if (refreshOnWindowFocus) {
      return subscribeFocus(reFreshOnFocus);
    }
  }, [reFreshOnFocus]);
  /*------------- refreshOnFocus end ---------------*/

  /*------------- mutate start ---------------*/
  // 突变
  const mutate = useCallback((newData) => {
    setHistory((s: any) => {
      s[newstKey.current].data = newData;
      return { ...s };
    });
  }, []);
  /*------------- mutate end ---------------*/

  /*------------- mount&unmount start ---------------*/
  // 第一次默认执行
  useEffect(() => {
    if (!manual) {
      // 第一次默认执行，可以通过 defaultParams 设置参数
      runProxy(...defaultParams as any);
    }
  }, []);


  //  refreshDeps 变化，使用最新的参数重新执行
  useUpdateEffect(() => {
    if (!manual) {
      runProxyRef.current(...historyRef.current[newstKey.current].params);
    }
  }, [...refreshDeps]);

  // 卸载组件触发
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      unmountFlag.current = true;
    };
  }, []);
  /*------------- mount&unmount end ---------------*/

  return {
    ...history[newstKey.current],
    stopPolling,
    run: runProxy,
    mutate,
    history
  } as BaseResult<U, P>
}

export default useAsync;