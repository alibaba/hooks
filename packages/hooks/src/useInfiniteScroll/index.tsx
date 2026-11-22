import { useMemo, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import useEventListener from '../useEventListener';
import useMemoizedFn from '../useMemoizedFn';
import useRequest from '../useRequest';
import useUpdateEffect from '../useUpdateEffect';
import { getTargetElement } from '../utils/domTarget';
import { getClientHeight, getScrollHeight, getScrollTop } from '../utils/rect';
import useIsomorphicLayoutEffectWithTarget from '../utils/useIsomorphicLayoutEffectWithTarget';
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
  // flag: set in onSuccess (bottom direction only) to trigger scrollMethod via effect
  const pendingBottomScrollCheckRef = useRef(false);
  // Whether a request is in flight. `loading` and `loadingMore` are state, so two calls in the same
  // tick both read the value from before the re-render and would both start a request. The service
  // advances its own cursor per call while useRequest keeps only the newest response, so the
  // superseded page would be dropped from the list entirely.
  const inFlightRef = useRef(false);
  // Identity of the request each completion belongs to. A boolean cannot tell an older request's
  // completion from the newest one's, and a reload started from onSuccess/onError begins before the
  // older request's onFinally runs: clearing the flag there let a third request supersede the reload
  // and drop its page. The newest token is the only one allowed to release the guard.
  const requestSeqRef = useRef(0);
  const latestRequestRef = useRef(0);

  const noMore = useMemo(() => {
    if (!isNoMore) {
      return false;
    }
    return isNoMore(finalData);
  }, [finalData]);

  const { loading, error, run, runAsync, cancel } = useRequest(
    async (lastData?: TData) => {
      const token = ++requestSeqRef.current;
      latestRequestRef.current = token;
      try {
        const currentData = await service(lastData);
        return { currentData, lastData, token };
      } catch (err) {
        // Tag the error with the same identity: onFinally receives `undefined` data for a rejected
        // request, and a reload started from its onError runs before that onFinally.
        if (err && typeof err === 'object') {
          (err as { __inFlightToken?: number }).__inFlightToken = token;
        }
        throw err;
      }
    },
    {
      manual,
      onFinally: (_, d, e) => {
        // Release the guard only for the newest request. An older request's completion (its
        // onSuccess/onError has already started a reload) must not unlock the reload's protection.
        const token = d?.token ?? (e as { __inFlightToken?: number } | undefined)?.__inFlightToken;
        if (token === latestRequestRef.current) {
          inFlightRef.current = false;
          setLoadingMore(false);
        }
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

        pendingBottomScrollCheckRef.current = !isScrollToTop && !!d.currentData.list?.length;

        if (isScrollToTop) {
          setTimeout(() => {
            // use requestAnimationFrame to ensure the scroll position is updated (To ensure compatibility react 19)
            requestAnimationFrame(() => {
              let el = getTargetElement(target);
              el = el === document ? document.documentElement : el;
              if (el) {
                const scrollHeight = getScrollHeight(el);
                (el as Element).scrollTo(0, scrollHeight - scrollBottom.current);
              }
            });
          });
        }
        onSuccess?.(d.currentData);
      },
      onError: (e) => onError?.(e),
    },
  );

  const loadMore = useMemoizedFn(() => {
    if (noMore || inFlightRef.current) {
      return;
    }
    inFlightRef.current = true;
    setLoadingMore(true);
    run(finalData);
  });

  const runAsyncForCurrent = async (data?: TData) => {
    const res = await runAsync(data);
    return res.currentData;
  };

  const loadMoreAsync = useMemoizedFn(() => {
    if (noMore || inFlightRef.current) {
      return Promise.reject();
    }
    inFlightRef.current = true;
    setLoadingMore(true);
    return runAsyncForCurrent(finalData);
  });

  // A reload supersedes whatever is in flight: useRequest cancels the older request, and a cancelled
  // request never reaches `onFinally`, so the flag has to be released here as well.
  const reload = () => {
    inFlightRef.current = true;
    setLoadingMore(false);
    return run();
  };

  const reloadAsync = () => {
    inFlightRef.current = true;
    setLoadingMore(false);
    return runAsyncForCurrent();
  };

  const scrollMethod = useMemoizedFn(() => {
    if (loading || loadingMore) {
      return;
    }

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
  });
  useUpdateEffect(() => {
    if (!pendingBottomScrollCheckRef.current || loading || loadingMore) {
      return;
    }
    pendingBottomScrollCheckRef.current = false;
    scrollMethod();
  }, [finalData, loading, loadingMore]);

  useEventListener('scroll', scrollMethod, { target });

  // Re-check whether more data is needed when the scroll container suddenly gets taller
  const resizeCheck = useMemoizedFn(() => {
    // No successful data is available before a manual request or after the first load fails.
    // A resize should not trigger a request in those cases.
    if (!finalData) {
      return;
    }
    scrollMethod();
  });
  useIsomorphicLayoutEffectWithTarget(
    () => {
      const el = getTargetElement(target);
      if (!el) {
        return;
      }

      // The document's content box does not necessarily resize with the viewport.
      if (el === document) {
        window.addEventListener('resize', resizeCheck);
        return () => window.removeEventListener('resize', resizeCheck);
      }

      const targetEl = el as Element;
      let clientWidth = targetEl.clientWidth;
      let clientHeight = targetEl.clientHeight;
      const observer = new ResizeObserver(() => {
        const nextWidth = targetEl.clientWidth;
        const nextHeight = targetEl.clientHeight;
        // observe() also notifies initially, even when the container has not resized.
        if (nextWidth === clientWidth && nextHeight === clientHeight) {
          return;
        }
        clientWidth = nextWidth;
        clientHeight = nextHeight;
        resizeCheck();
      });
      observer.observe(targetEl);
      return () => {
        observer.disconnect();
      };
    },
    [],
    target,
  );

  useUpdateEffect(() => {
    inFlightRef.current = true;
    setLoadingMore(false);
    run();
  }, [...reloadDeps]);

  // A cancelled request never reaches `onFinally`, so the in-flight flag has to be released here too.
  // Without this `loadingMore` stays true and `scrollMethod` refuses to load again for good.

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
    cancel: useMemoizedFn(() => {
      inFlightRef.current = false;
      setLoadingMore(false);
      cancel();
    }),
  };
};

export default useInfiniteScroll;
