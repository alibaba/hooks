import { useMemo, useRef, useState } from 'react';
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
    direction = 'bottom',
    reloadDeps = [],
    manual,
    onBefore,
    onSuccess,
    onError,
    onFinally,
  } = options;

  const [finalData, setFinalData] = useState<TData>();
  const [loadingMore, setLoadingMore] = useState(false);
  const isScrollToTop = direction === 'top';
  // lastScrollTop is used to determine whether the scroll direction is up or down
  const lastScrollTop = useRef<number>(undefined);
  // scrollBottom is used to record the distance from the bottom of the scroll bar
  const scrollBottom = useRef<number>(0);

  const noMore = useMemo(() => {
    if (!isNoMore) {
      return false;
    }
    return isNoMore(finalData);
  }, [finalData]);

  const { loading, error, run, runAsync, cancel } = useRequest(
    async (lastData?: TData) => {
      const currentData = await service(lastData);
      return { currentData, lastData };
    },
    {
      manual,
      onFinally: (_, d, e) => {
        setLoadingMore(false);
        onFinally?.(d?.currentData, e);
      },
      onBefore: () => onBefore?.(),
      onSuccess: (d) => {
        if (!d.lastData) {
          setFinalData({
            ...d.currentData,
            list: [...(d.currentData.list ?? [])],
          });
        } else {
          setFinalData({
            ...d.currentData,
            list: isScrollToTop
              ? [...d.currentData.list, ...(d.lastData.list ?? [])]
              : [...(d.lastData.list ?? []), ...d.currentData.list],
          });
        }

        setTimeout(() => {
          if (isScrollToTop) {
            let el = getTargetElement(target);
            el = el === document ? document.documentElement : el;
            if (el) {
              const scrollHeight = getScrollHeight(el);
              (el as Element).scrollTo(0, scrollHeight - scrollBottom.current);
            }
          } else {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            scrollMethod();
          }
        });

        onSuccess?.(d.currentData);
      },
      onError: (e) => onError?.(e),
    },
  );

  const loadMore = useMemoizedFn(() => {
    if (noMore) {
      return;
    }
    setLoadingMore(true);
    run(finalData);
  });

  const runAsyncForCurrent = async (data?: TData) => {
    const res = await runAsync(data);
    return res.currentData;
  };

  const loadMoreAsync = useMemoizedFn(() => {
    if (noMore) {
      return Promise.reject();
    }
    setLoadingMore(true);
    return runAsyncForCurrent(finalData);
  });

  const reload = () => {
    setLoadingMore(false);
    return run();
  };

  const reloadAsync = () => {
    setLoadingMore(false);
    return runAsyncForCurrent();
  };

  const scrollMethod = () => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    const targetEl = el === document ? document.documentElement : el;
    const scrollTop = getScrollTop(targetEl);
    const scrollHeight = getScrollHeight(targetEl);
    const clientHeight = getClientHeight(targetEl);

    if (isScrollToTop) {
      if (
        lastScrollTop.current !== undefined &&
        lastScrollTop.current > scrollTop &&
        scrollTop <= threshold
      ) {
        loadMore();
      }
      lastScrollTop.current = scrollTop;
      scrollBottom.current = scrollHeight - scrollTop;
    } else if (scrollHeight - scrollTop <= clientHeight + threshold) {
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

    loadMore,
    loadMoreAsync,
    reload: useMemoizedFn(reload),
    reloadAsync: useMemoizedFn(reloadAsync),
    mutate: setFinalData,
    cancel,
  };
};

export default useInfiniteScroll;
