import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BaseOptions,
  BaseResult,
  FetchConfig,
  Fetches,
  FetchResult,
  noop,
  Options,
  OptionsWithFormat,
  Service,
  Subscribe,
} from './types';
import { isDocumentVisible } from './utils';
import { getCache, setCache } from './utils/cache';
import limit from './utils/limit';
import usePersistFn from './utils/usePersistFn';
import useUpdateEffect from './utils/useUpdateEffect';
import subscribeFocus from './utils/windowFocus';
import subscribeVisible from './utils/windowVisible';

const DEFAULT_KEY = 'AHOOKS_USE_REQUEST_DEFAULT_KEY';

class Fetch<R, P extends any[]> {
  config: FetchConfig<R, P>;

  service: Service<R, P>;

  // 请求时序
  count = 0;

  // 是否卸载
  unmountedFlag = false;

  // visible 后，是否继续轮询
  pollingWhenVisibleFlag = false;

  pollingTimer: any = undefined;

  loadingDelayTimer: any = undefined;

  subscribe: Subscribe<R, P>;

  unsubscribe: noop[] = [];

  that: any = this;

  state: FetchResult<R, P> = {
    loading: false,
    params: [] as any,
    data: undefined,
    error: undefined,
    run: this.run.bind(this.that),
    mutate: this.mutate.bind(this.that),
    refresh: this.refresh.bind(this.that),
    cancel: this.cancel.bind(this.that),
    unmount: this.unmount.bind(this.that),
  };

  debounceRun: any;

  throttleRun: any;

  limitRefresh: any;

  constructor(
    service: Service<R, P>,
    config: FetchConfig<R, P>,
    subscribe: Subscribe<R, P>,
    initState?: { data?: any; error?: any; params?: any; loading?: any },
  ) {
    this.service = service;
    this.config = config;
    this.subscribe = subscribe;
    if (initState) {
      this.state = {
        ...this.state,
        ...initState,
      };
    }

    this.debounceRun = this.config.debounceInterval
      ? debounce(this._run, this.config.debounceInterval)
      : undefined;
    this.throttleRun = this.config.throttleInterval
      ? throttle(this._run, this.config.throttleInterval)
      : undefined;
    this.limitRefresh = limit(this.refresh.bind(this), this.config.focusTimespan);

    if (this.config.pollingInterval) {
      this.unsubscribe.push(subscribeVisible(this.rePolling.bind(this)));
    }
    if (this.config.refreshOnWindowFocus) {
      this.unsubscribe.push(subscribeFocus(this.limitRefresh.bind(this)));
    }
  }

  setState(s = {}) {
    this.state = {
      ...this.state,
      ...s,
    };
    this.subscribe(this.state);
  }

  _run(...args: P) {
    // 取消已有定时器
    if (this.pollingTimer) {
      clearTimeout(this.pollingTimer);
    }
    // 取消 loadingDelayTimer
    if (this.loadingDelayTimer) {
      clearTimeout(this.loadingDelayTimer);
    }
    this.count += 1;
    // 闭包存储当次请求的 count
    const currentCount = this.count;

    this.setState({
      loading: !this.config.loadingDelay,
      params: args,
    });

    if (this.config.loadingDelay) {
      this.loadingDelayTimer = setTimeout(() => {
        this.setState({
          loading: true,
        });
      }, this.config.loadingDelay);
    }

    return this.service(...args)
      .then((res) => {
        if (!this.unmountedFlag && currentCount === this.count) {
          if (this.loadingDelayTimer) {
            clearTimeout(this.loadingDelayTimer);
          }
          const formattedResult = this.config.formatResult ? this.config.formatResult(res) : res;
          this.setState({
            data: formattedResult,
            error: undefined,
            loading: false,
          });
          if (this.config.onSuccess) {
            this.config.onSuccess(formattedResult, args);
          }
          return formattedResult;
        }
      })
      .catch((error) => {
        if (!this.unmountedFlag && currentCount === this.count) {
          if (this.loadingDelayTimer) {
            clearTimeout(this.loadingDelayTimer);
          }
          this.setState({
            data: undefined,
            error,
            loading: false,
          });
          if (this.config.onError) {
            this.config.onError(error, args);
          }
          // If throwOnError, user should catch the error self,
          // or the page will crash
          if (this.config.throwOnError) {
            throw error;
          }
          console.error(error);
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject(
            'useRequest has caught the exception, if you need to handle the exception yourself, you can set options.throwOnError to true.',
          );
        }
      })
      .finally(() => {
        if (!this.unmountedFlag && currentCount === this.count) {
          if (this.config.pollingInterval) {
            // 如果屏幕隐藏，并且 !pollingWhenHidden, 则停止轮询，并记录 flag，等 visible 时，继续轮询
            if (!isDocumentVisible() && !this.config.pollingWhenHidden) {
              this.pollingWhenVisibleFlag = true;
              return;
            }
            this.pollingTimer = setTimeout(() => {
              this._run(...args);
            }, this.config.pollingInterval);
          }
        }
      });
  }

  run(...args: P) {
    if (this.debounceRun) {
      this.debounceRun(...args);
      // TODO 如果 options 存在 debounceInterval，或 throttleInterval，则 run 和 refresh 不会返回 Promise。 带类型需要修复后，此处变成 return;。
      return Promise.resolve(null as any);
    }
    if (this.throttleRun) {
      this.throttleRun(...args);
      return Promise.resolve(null as any);
    }
    return this._run(...args);
  }

  cancel() {
    if (this.debounceRun) {
      this.debounceRun.cancel();
    }
    if (this.throttleRun) {
      this.throttleRun.cancel();
    }
    if (this.loadingDelayTimer) {
      clearTimeout(this.loadingDelayTimer);
    }
    if (this.pollingTimer) {
      clearTimeout(this.pollingTimer);
    }
    this.pollingWhenVisibleFlag = false;

    this.count += 1;
    this.setState({
      loading: false,
    });
  }

  refresh() {
    return this.run(...this.state.params);
  }

  rePolling() {
    if (this.pollingWhenVisibleFlag) {
      this.pollingWhenVisibleFlag = false;
      this.refresh();
    }
  }

  mutate(data: any) {
    if (typeof data === 'function') {
      this.setState({
        // eslint-disable-next-line react/no-access-state-in-setstate
        data: data(this.state.data) || {},
      });
    } else {
      this.setState({
        data,
      });
    }
  }

  unmount() {
    this.unmountedFlag = true;
    this.cancel();
    this.unsubscribe.forEach((s) => {
      s();
    });
  }
}

function useAsync<R, P extends any[], U, UU extends U = any>(
  service: Service<R, P>,
  options: OptionsWithFormat<R, P, U, UU>,
): BaseResult<U, P>;
function useAsync<R, P extends any[]>(
  service: Service<R, P>,
  options?: BaseOptions<R, P>,
): BaseResult<R, P>;
function useAsync<R, P extends any[], U, UU extends U = any>(
  service: Service<R, P>,
  options?: Options<R, P, U, UU>,
): BaseResult<U, P> {
  const _options = options || ({} as Options<R, P, U, UU>);
  const {
    refreshDeps = [],
    manual = false,
    onSuccess = () => {},
    onError = () => {},

    defaultLoading = false,
    loadingDelay,

    pollingInterval = 0,
    pollingWhenHidden = true,

    defaultParams = [],
    refreshOnWindowFocus = false,
    focusTimespan = 5000,
    fetchKey,
    cacheKey,
    cacheTime = 5 * 60 * 1000,
    staleTime = 0,
    debounceInterval,
    throttleInterval,
    initialData,
    ready = true,
    throwOnError = false,
  } = _options;

  const newstFetchKey = useRef(DEFAULT_KEY);

  // 持久化一些函数
  const servicePersist = usePersistFn(service) as any;

  const onSuccessPersist = usePersistFn(onSuccess);

  const onErrorPersist = usePersistFn(onError);

  const fetchKeyPersist = usePersistFn(fetchKey);

  let formatResult: any;
  if ('formatResult' in _options) {
    // eslint-disable-next-line prefer-destructuring
    formatResult = _options.formatResult;
  }
  const formatResultPersist = usePersistFn(formatResult);

  const config = {
    formatResult: formatResultPersist,
    onSuccess: onSuccessPersist,
    onError: onErrorPersist,
    loadingDelay,
    pollingInterval,
    pollingWhenHidden,
    refreshOnWindowFocus,
    focusTimespan,
    debounceInterval,
    throttleInterval,
    throwOnError,
  };

  const subscribe = usePersistFn((key: string, data: any) => {
    setFetches((s) => {
      // eslint-disable-next-line no-param-reassign
      s[key] = data;
      return { ...s };
    });
  }) as any;

  const [fetches, setFetches] = useState<Fetches<U, P>>(() => {
    // 如果有 缓存，则从缓存中读数据
    if (cacheKey) {
      const cacheData = getCache(cacheKey)?.data;
      if (cacheData) {
        newstFetchKey.current = cacheData.newstFetchKey;
        /* 使用 initState, 重新 new Fetch */
        const newFetches: any = {};
        Object.keys(cacheData.fetches).forEach((key) => {
          const cacheFetch = cacheData.fetches[key];
          const newFetch = new Fetch(servicePersist, config, subscribe.bind(null, key), {
            loading: cacheFetch.loading,
            params: cacheFetch.params,
            data: cacheFetch.data,
            error: cacheFetch.error,
          });
          newFetches[key] = newFetch.state;
        });
        return newFetches;
      }
    }
    return {};
  });

  const fetchesRef = useRef(fetches);
  fetchesRef.current = fetches;

  const readyMemoryParams = useRef<P>();

  const run = useCallback(
    (...args: P) => {
      if (!ready) {
        // 没有 ready, 记录请求参数，等 ready 后，发起请求用
        readyMemoryParams.current = args;
        return;
      }

      if (fetchKeyPersist) {
        const key = fetchKeyPersist(...args);
        newstFetchKey.current = key === undefined ? DEFAULT_KEY : key;
      }
      const currentFetchKey = newstFetchKey.current;
      // 这里必须用 fetchsRef，而不能用 fetches。
      // 否则在 reset 完，立即 run 的时候，这里拿到的 fetches 是旧的。
      let currentFetch = fetchesRef.current[currentFetchKey];
      if (!currentFetch) {
        const newFetch = new Fetch(servicePersist, config, subscribe.bind(null, currentFetchKey), {
          data: initialData,
        });
        currentFetch = newFetch.state;
        setFetches((s) => {
          // eslint-disable-next-line no-param-reassign
          s[currentFetchKey] = currentFetch;
          return { ...s };
        });
      }
      return currentFetch.run(...args);
    },
    [fetchKey, subscribe, ready],
  );
  const runRef = useRef(run);
  runRef.current = run;

  // cache
  useUpdateEffect(() => {
    if (cacheKey) {
      setCache(cacheKey, cacheTime, {
        fetches,
        newstFetchKey: newstFetchKey.current,
      });
    }
  }, [cacheKey, fetches]);

  // for ready
  const hasTriggeredByReady = useRef(false);
  useUpdateEffect(() => {
    if (ready) {
      if (!hasTriggeredByReady.current && readyMemoryParams.current) {
        runRef.current(...readyMemoryParams.current);
      }
      hasTriggeredByReady.current = true;
    }
  }, [ready]);

  // 第一次默认执行
  useEffect(() => {
    if (!manual) {
      // 如果有缓存，则重新请求
      if (Object.keys(fetches).length > 0) {
        // 如果 staleTime 是 -1，则 cache 永不过期
        // 如果 statleTime 超期了，则重新请求
        const cacheStartTime = (cacheKey && getCache(cacheKey)?.startTime) || 0;
        if (!(staleTime === -1 || new Date().getTime() - cacheStartTime <= staleTime)) {
          /* 重新执行所有的 cache */
          Object.values(fetches).forEach((f) => {
            f.refresh();
          });
        }
      } else {
        // 第一次默认执行，可以通过 defaultParams 设置参数
        runRef.current(...(defaultParams as any));
      }
    }
  }, []);

  // 重置 fetches
  const reset = useCallback(() => {
    Object.values(fetchesRef.current).forEach((f) => {
      f.unmount();
    });
    newstFetchKey.current = DEFAULT_KEY;
    setFetches({});
    // 不写会有问题。如果不写，此时立即 run，会是老的数据
    fetchesRef.current = {};
  }, [setFetches]);

  //  refreshDeps 变化，重新执行所有请求
  useUpdateEffect(() => {
    if (!manual) {
      /* 全部重新执行 */
      Object.values(fetchesRef.current).forEach((f) => {
        f.refresh();
      });
    }
  }, [...refreshDeps]);

  // 卸载组件触发
  useEffect(
    () => () => {
      Object.values(fetchesRef.current).forEach((f) => {
        f.unmount();
      });
    },
    [],
  );

  const notExecutedWarning = useCallback(
    (name: string) => () => {
      console.warn(`You should't call ${name} when service not executed once.`);
    },
    [],
  );

  return {
    loading: (ready && !manual) || defaultLoading,
    data: initialData,
    error: undefined,
    params: [],
    cancel: notExecutedWarning('cancel'),
    refresh: notExecutedWarning('refresh'),
    mutate: notExecutedWarning('mutate'),

    ...((fetches[newstFetchKey.current] as FetchResult<U, P> | undefined) || {}),
    run,
    fetches,
    reset,
  } as BaseResult<U, P>;
}

export default useAsync;
