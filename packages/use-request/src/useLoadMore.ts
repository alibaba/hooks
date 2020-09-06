import { useRef, useCallback, useMemo, useEffect, useState } from 'react';
import useAsync from './useAsync';
import {
  LoadMoreParams,
  LoadMoreOptionsWithFormat,
  LoadMoreResult,
  LoadMoreFormatReturn,
  LoadMoreOptions,
} from './types';
import useUpdateEffect from './utils/useUpdateEffect';

function useLoadMore<R extends LoadMoreFormatReturn, RR>(
  service: (...p: LoadMoreParams<R>) => Promise<RR>,
  options: LoadMoreOptionsWithFormat<R, RR>,
): LoadMoreResult<R>;
function useLoadMore<R extends LoadMoreFormatReturn, RR extends R = any>(
  service: (...p: LoadMoreParams<RR>) => Promise<R>,
  options: LoadMoreOptions<R>,
): LoadMoreResult<R>;
function useLoadMore<R extends LoadMoreFormatReturn, RR = any>(
  service: (...p: LoadMoreParams<any>) => Promise<any>,
  options: LoadMoreOptions<R> | LoadMoreOptionsWithFormat<R, RR>,
): LoadMoreResult<R> {
  const { refreshDeps = [], ref, isNoMore, threshold = 100, fetchKey, ...restOptions } = options;

  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (options.fetchKey) {
      console.warn("useRequest loadMore mode don't need fetchKey!");
    }
  }, []);

  const result: any = useAsync(service, {
    ...(restOptions as any),
    fetchKey: (d) => d?.list?.length || 0,
    onSuccess: (...params) => {
      setLoadingMore(false);
      if (options.onSuccess) {
        options.onSuccess(...params);
      }
    },
  });

  const { data, run, params, reset, loading, fetches } = result;

  const reload = useCallback(() => {
    reset();
    const [, ...restParams] = params;
    run(undefined, ...restParams);
  }, [run, reset, params]);

  const reloadRef = useRef(reload);
  reloadRef.current = reload;
  /* loadMore 场景下，如果 refreshDeps 变化，重置到第一页 */
  useUpdateEffect(() => {
    /* 只有自动执行的场景， refreshDeps 才有效 */
    if (!options.manual) {
      reloadRef.current();
    }
  }, [...refreshDeps]);

  const dataGroup = useMemo(() => {
    let listGroup: any[] = [];
    // 在 loadMore 时，不希望清空上一次的 data。需要把最后一个 非 loading 的请求 data，放回去。
    let lastNoLoadingData: R = data;
    Object.values(fetches).forEach((h: any) => {
      if (h.data?.list) {
        listGroup = listGroup.concat(h.data?.list);
      }
      if (!h.loading) {
        lastNoLoadingData = h.data;
      }
    });
    return {
      ...lastNoLoadingData,
      list: listGroup,
    };
  }, [fetches, data]);

  const noMore = isNoMore ? !loading && !loadingMore && isNoMore(dataGroup) : false;

  const loadMore = useCallback(() => {
    if (noMore) {
      return;
    }
    setLoadingMore(true);
    const [, ...restParams] = params;
    run(dataGroup, ...restParams);
  }, [noMore, run, dataGroup, params]);

  /* 上拉加载的方法 */
  const scrollMethod = () => {
    if (loading || loadingMore || !ref || !ref.current) {
      return;
    }
    if (ref.current.scrollHeight - ref.current.scrollTop <= ref.current.clientHeight + threshold) {
      loadMore();
    }
  };

  // 如果不用 ref，而用之前的 useCallbak，在某些情况下会出问题，造成拿到的 loading 不是最新的。
  // fix https://github.com/alibaba/hooks/issues/630
  const scrollMethodRef = useRef(scrollMethod);
  scrollMethodRef.current = scrollMethod;

  /* 如果有 ref，则会上拉加载更多 */
  useEffect(() => {
    if (!ref || !ref.current) {
      return () => {};
    }

    const scrollTrigger = () => scrollMethodRef.current();

    ref.current.addEventListener('scroll', scrollTrigger);
    return () => {
      if (ref && ref.current) {
        ref.current.removeEventListener('scroll', scrollTrigger);
      }
    };
  }, [scrollMethodRef]);

  return {
    ...result,
    data: dataGroup,
    reload,
    loading: loading && dataGroup.list.length === 0,
    loadMore,
    loadingMore,
    noMore,
  };
}

export default useLoadMore;
