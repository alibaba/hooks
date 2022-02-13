import { useState, useCallback } from 'react';
import {
  useCreation,
  useLatest,
  useMemoizedFn,
  useMount,
  useUnmount,
  useUpdate,
} from '../../index';
import Fetch from './Fetch';
import type { Options, Plugin, Result, Service, Subscribe, FetchState } from './types';
import type { FetchSubscribe } from './types';

function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = [],
) {
  const { manual = false, ...rest } = options;

  const fetchOptions = {
    manual,
    ...rest,
  };

  const serviceRef = useLatest(service);
  const [fetches, setFetches] = useState<{ [key: string]: FetchState<TData, TParams> }>({});

  const fetchUpdate: FetchSubscribe<TData, TParams> = useCallback(
    (fetchKey: string, fetchState: FetchState<TData, TParams>) => {
      setFetches((s) => {
        s[fetchKey] = {
          loading: fetchState.loading,
          data: fetchState.data,
          error: fetchState.error,
          params: (fetchState.params || []) as TParams,
        };
        return { ...s };
      });
    },
    [],
  );

  const update = useUpdate() as Subscribe;

  const fetchInstance = useCreation(() => {
    const initState = plugins.map((p) => p?.onInit?.(fetchOptions)).filter(Boolean);
    let subscribe: Subscribe | FetchSubscribe<TData, TParams>;
    if (fetchOptions.fetchKey) {
      subscribe = fetchUpdate;
    } else {
      subscribe = update;
    }
    return new Fetch<TData, TParams>(
      serviceRef,
      fetchOptions,
      subscribe,
      Object.assign({}, ...initState),
    );
  }, []);
  fetchInstance.options = fetchOptions;
  // run all plugins hooks
  fetchInstance.pluginImpls = plugins.map((p) => p(fetchInstance, fetchOptions));

  useMount(() => {
    if (!manual) {
      // useCachePlugin can set fetchInstance.state.params from cache when init
      const params = fetchInstance.state.params || options.defaultParams || [];
      // @ts-ignore
      fetchInstance.run(...params);
    }
  });

  useUnmount(() => {
    fetchInstance.cancel();
  });

  const result: Result<TData, TParams> = {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
    params: fetchInstance.state.params || [],
    cancel: useMemoizedFn(fetchInstance.cancel.bind(fetchInstance)),
    refresh: useMemoizedFn(fetchInstance.refresh.bind(fetchInstance)),
    refreshAsync: useMemoizedFn(fetchInstance.refreshAsync.bind(fetchInstance)),
    run: useMemoizedFn(fetchInstance.run.bind(fetchInstance)),
    runAsync: useMemoizedFn(fetchInstance.runAsync.bind(fetchInstance)),
    mutate: useMemoizedFn(fetchInstance.mutate.bind(fetchInstance)),
  };

  if (fetchInstance.options.fetchKey) {
    return {
      fetches: Object.keys(fetches).reduce((final, fetchKey) => {
        const fetch = {
          ...fetches[fetchKey],
          cancel: result.cancel,
          refresh: result.refresh,
          refreshAsync: result.refreshAsync,
          run: result.run,
          runAsync: result.runAsync,
          mutate: result.mutate,
        };
        return {
          ...final,
          [fetchKey]: fetch,
        };
      }, {}),
      runAsync: fetchInstance.runAsync,
    };
  }

  return result;
}

export default useRequestImplement;
