import { useCreation, useMount, useUnmount, useUpdate, useLatest } from '../../index';
import Fetch from './Fetch';
import type { Options, Plugin, Result, Service } from './types';

function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = [],
) {
  const {
    manual = false,
    defaultParams,
    onSuccess,
    onError,
    onBefore,
    onFinally,
    // formatResult = v => v,
    ...rest
  } = options;

  const optionsRef = useLatest(options);

  const memoizedOptions = {
    manual,
    ...rest,
    get onSuccess() {
      return optionsRef.current.onSuccess;
    },
    get onError() {
      return optionsRef.current.onError;
    },
    get onBefore() {
      return optionsRef.current.onBefore;
    },
    get onFinally() {
      return optionsRef.current.onFinally;
    },
  };

  const serviceRef = useLatest(service);

  const update = useUpdate();

  const fetchInstance = useCreation(() => {
    return new Fetch<TData, TParams>(serviceRef, memoizedOptions, update);
  }, []);

  // run all plugins hooks
  fetchInstance.pluginImpls = plugins.map((p) => p(fetchInstance, memoizedOptions));

  useMount(() => {
    if (!manual) {
      // useCachePlugin can set fetchInstance.state.params from cache when init
      const params = fetchInstance.state.params || defaultParams || [];
      // @ts-ignore
      fetchInstance.run(...params);
    }
  });

  useUnmount(() => {
    fetchInstance.cancel();
  });

  return {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
    params: fetchInstance.state.params || [],
    cancel: fetchInstance.cancel.bind(fetchInstance),
    refresh: fetchInstance.refresh.bind(fetchInstance),
    refreshAsync: fetchInstance.refreshAsync.bind(fetchInstance),
    run: fetchInstance.run.bind(fetchInstance),
    runAsync: fetchInstance.runAsync.bind(fetchInstance),
    mutate: fetchInstance.mutate.bind(fetchInstance),
  } as Result<TData, TParams>;
}

export default useRequestImplement;
