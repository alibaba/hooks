import { useCreation, useMount, useUnmount, useUpdate, useLatest } from '../../index';
import Fetch from './fetch';
import type { Options, Plugin, Result, Service } from './types';

function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = [],
) {
  const {
    manual = false,
    onSuccess,
    onError,
    onBefore,
    onFinally,
    defaultParams,
    // formatResult = v => v,
    ...rest
  } = options;

  const memoizedOptions = {
    manual,
    onSuccessRef: useLatest(onSuccess),
    onErrorRef: useLatest(onError),
    onBeforeRef: useLatest(onBefore),
    onFinallyRef: useLatest(onFinally),
    // formatResultRef: useLatest(formatResult),
    ...rest,
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
      // @ts-ignore
      fetchInstance.run(...(defaultParams || []));
    }
  });

  useUnmount(() => {
    fetchInstance.cancel();
  });

  return {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
    params: fetchInstance.state.params,
    cancel: fetchInstance.cancel.bind(fetchInstance),
    refresh: fetchInstance.refresh.bind(fetchInstance),
    refreshAsync: fetchInstance.refreshAsync.bind(fetchInstance),
    run: fetchInstance.run.bind(fetchInstance),
    runAsync: fetchInstance.runAsync.bind(fetchInstance),
    mutate: fetchInstance.mutate.bind(fetchInstance),
  } as Result<TData, TParams>;
}

export default useRequestImplement;
