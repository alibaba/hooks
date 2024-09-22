import { useMemo, useState } from 'react';
import useEventListener from '../useEventListener';
import useMemoizedFn from '../useMemoizedFn';
import useRequest from '../useRequest';
import useUpdateEffect from '../useUpdateEffect';
import { getTargetElement } from '../utils/domTarget';
import { getClientHeight, getScrollHeight, getScrollTop } from '../utils/rect';
import type { Data, InfiniteScrollOptions, Service } from './types';

const useInfiniteScroll = <TData extends Data>(
  service: Service<TData>,
  options: InfiniteScrollOptions<TData> = {},
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
    forcedLoadMore = false,
  } = options;

  const [finalData, setFinalData] = useState<TData>();
  const [loadingMore, setLoadingMore] = useState(false);

  const { noMore, trulyNoMore } = useMemo(() => {
    if (!isNoMore)
      return {
        noMore: false,
        trulyNoMore: false,
      };
    const dataIsNoMore = isNoMore(finalData);

    return {
      noMore: !forcedLoadMore && dataIsNoMore,
      trulyNoMore: dataIsNoMore,
    };
  }, [finalData]);

  const { loading, error, run, runAsync, cancel } = useRequest(
    async (lastData?: TData, _isNeedForcedLoadMore?: boolean) => {
      const currentData = await service(lastData);
      if (!lastData) {
        setFinalData({
          ...currentData,
          list: [...(currentData.list ?? [])],
        });
      } else {
        setFinalData({
          ...currentData,
          list: [...(lastData.list ?? []), ...currentData.list],
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
      onSuccess: (d, isNeedForcedLoadMore) => {
        setTimeout(() => {
          // if request trrigered by forced load more, is no need to check again
          if (isNeedForcedLoadMore) {
            return;
          }
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          scrollMethod();
        });
        onSuccess?.(d);
      },
      onError: (e) => onError?.(e),
    },
  );

  const loadMore = useMemoizedFn((isScrollToBottom = false) => {
    if (noMore) return;
    // when set `forcedLoadMore`, only user scroll to bottom will trrigger load more
    if (forcedLoadMore && !isScrollToBottom) return;

    setLoadingMore(true);
    run(finalData, forcedLoadMore && isScrollToBottom);
  });

  const loadMoreAsync = useMemoizedFn((isScrollToBottom = false) => {
    if (noMore) return Promise.reject();
    // when set `forcedLoadMore`, only user scroll to bottom will trrigger load more
    if (forcedLoadMore && !isScrollToBottom) return Promise.reject();

    setLoadingMore(true);
    return runAsync(finalData, forcedLoadMore && isScrollToBottom);
  });

  const reload = () => {
    setLoadingMore(false);
    return run();
  };

  const reloadAsync = () => {
    setLoadingMore(false);
    return runAsync();
  };

  const scrollMethod = () => {
    let el = getTargetElement(target);
    if (!el) {
      return;
    }

    el = el === document ? document.documentElement : el;

    const scrollTop = getScrollTop(el);
    const scrollHeight = getScrollHeight(el);
    const clientHeight = getClientHeight(el);

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      if (scrollHeight - scrollTop <= clientHeight) {
        loadMore(true);
        return;
      }

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
    error,
    loadingMore,
    noMore,
    /** when set `forcedLoadMore` true, `noMore` will be always true, use `trulyNoMore` to judge data whther is no more */
    trulyNoMore,
    loadMore,
    loadMoreAsync,
    reload: useMemoizedFn(reload),
    reloadAsync: useMemoizedFn(reloadAsync),
    mutate: setFinalData,
    cancel,
  };
};

export default useInfiniteScroll;
