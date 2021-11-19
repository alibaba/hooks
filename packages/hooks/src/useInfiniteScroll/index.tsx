import { useMemo, useState } from 'react';
import { useEventListener, useMemoizedFn, useRequest, useUpdateEffect } from '../';
import { getTargetElement } from '../utils/domTarget';
import type { Data, InfiniteSrollOptions, Service } from './types';

const useInfiniteScroll = <TData extends Data>(
  service: Service<TData>,
  options: InfiniteSrollOptions<TData> = {},
) => {
  const {
    target,
    isNoMore,
    threshold = 100,
    reloadDeps = [],
    manual,
    onBefore,
    onSuccess,
    onError,
    onFinally,
  } = options;

  const [finalData, setFinalData] = useState<TData>();
  const [loadingMore, setLoadingMore] = useState(false);

  const noMore = useMemo(() => {
    if (!isNoMore) return false;
    return isNoMore(finalData);
  }, [finalData]);

  const { loading, run, runAsync, cancel } = useRequest(
    async (lastData?: TData) => {
      const currentData = await service(lastData);
      if (!lastData) {
        setFinalData(currentData);
      } else {
        setFinalData({
          ...currentData,
          // @ts-ignore
          list: [...lastData.list, ...currentData.list],
        });
      }
      return currentData;
    },
    {
      manual,
      onFinally: (_, d, e) => {
        setLoadingMore(false);
        onFinally?.(d, e);
      },
      onBefore: () => onBefore?.(),
      onSuccess: (d) => {
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          scrollMethod();
        });
        onSuccess?.(d);
      },
      onError: (e) => onError?.(e),
    },
  );

  const loadMore = () => {
    if (noMore) return;
    setLoadingMore(true);
    run(finalData);
  };

  const loadMoreAsync = () => {
    if (noMore) return;
    setLoadingMore(true);
    return runAsync(finalData);
  };

  const mutate = (data?: TData) => {
    setFinalData(data);
  };

  const reload = () => run();
  const reloadAsync = () => runAsync();

  const scrollMethod = () => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    if (el.scrollHeight - el.scrollTop <= el.clientHeight + threshold) {
      loadMore();
    }
  };

  useEventListener(
    'scroll',
    () => {
      if (loading || loadingMore) {
        return;
      }
      scrollMethod();
    },
    { target },
  );

  useUpdateEffect(() => {
    run();
  }, [...reloadDeps]);

  return {
    data: finalData,
    loading: !loadingMore && loading,
    loadingMore,
    noMore,

    loadMore: useMemoizedFn(loadMore),
    loadMoreAsync: useMemoizedFn(loadMoreAsync),
    reload: useMemoizedFn(reload),
    reloadAsync: useMemoizedFn(reloadAsync),
    mutate: useMemoizedFn(mutate),
    cancel,
  };
};

export default useInfiniteScroll;
