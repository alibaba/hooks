import { DependencyList, RefObject, useEffect, useState, useCallback, useRef } from 'react';
import useUpdateEffect from '../useUpdateEffect';

export interface ReturnValue<Item> {
  loading: boolean;
  loadingMore: boolean;
  data: Item[];
  reload: () => void;
  loadMore: () => void;
  noMore: boolean;
  total: number | undefined;
}

export interface Options<Result, Item> {
  initPageSize?: number;
  peerPageSize?: number;
  itemKey?: string | ((record: Item, index: number) => string);
  formatResult?: (
    x: Result,
  ) => {
    total: number;
    data: Item[];
  };
  ref?: RefObject<HTMLElement>;
  threshold?: number;
}

export interface FnParams {
  page: number;
  pageSize: number;
  offset: number;
  id?: any;
  startTime?: number;
}

export default function useLoadMore<Result = any, Item = any>(
  fn: (params: FnParams) => Promise<Result>,
  deps: DependencyList = [],
  options: Options<Result, Item>,
): ReturnValue<Item> {
  /* 初始化值 */
  const { itemKey, initPageSize = 10, formatResult, ref, threshold = 100 } = options;
  let { peerPageSize } = options;

  if (!peerPageSize) {
    peerPageSize = initPageSize;
  }

  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>();
  const [data, setData] = useState<Item[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  /* 控制重新执行 */
  const [count, setCount] = useState<number>(0);

  /* 控制异步请求时序 */
  const runCount = useRef(0);

  /* 开始的时间戳 */
  const startTime = useRef(new Date().getTime());

  /* id 模式下读取 Key */
  const getItemKey = useCallback(
    (item: Item, index: number) => {
      const key =
        typeof itemKey === 'function' ? itemKey(item, index) : (item as any)[itemKey as any];
      return key === undefined ? index : key;
    },
    [itemKey],
  );

  const run = useCallback(() => {
    runCount.current += 1;
    const currentCount = runCount.current;
    setLoading(true);

    const params: FnParams = {
      page,
      pageSize: (page === 1 ? initPageSize : peerPageSize) as number,
      offset: data.length,
      startTime: startTime.current,
    };

    /* id 模式需要增加最后一个 id */
    if (itemKey) {
      params.id = data.length > 0 ? getItemKey(data[data.length - 1], data.length - 1) : undefined;
    }

    fn(params).then((result: Result) => {
      if (currentCount !== runCount.current) {
        return;
      }
      setLoading(false);
      /* 格式化 result */
      const { total: currentTotal, data: currentData } = (formatResult
        ? formatResult(result)
        : result) as any;
      setData(data.concat(currentData));
      setTotal(currentTotal);
    });
  }, [page, initPageSize, peerPageSize, data]);

  const loadMore = useCallback(() => {
    if (total && data.length >= total) {
      return;
    }
    setPage(page + 1);
    setCount(count + 1);
  }, [page, count, data, total]);

  const reload = useCallback(() => {
    setPage(1);
    setData([]);
    startTime.current = new Date().getTime();
    setCount(count + 1);
  }, [count]);

  /* 上拉加载的方法 */
  const scrollMethod = useCallback(() => {
    if (loading || !ref || !ref.current) {
      return;
    }
    if (ref.current.scrollHeight - ref.current.scrollTop <= ref.current.clientHeight + threshold) {
      loadMore();
    }
  }, [loading, ref, loadMore]);

  /* 如果有 ref，则会上拉加载更多 */
  useEffect(() => {
    if (!ref || !ref.current) {
      return () => {};
    }
    ref.current.addEventListener('scroll', scrollMethod);
    return () => {
      if (ref && ref.current) {
        ref.current.removeEventListener('scroll', scrollMethod);
      }
    };
  }, [scrollMethod]);

  /* 只有初始化，或者 count 变化时，才会执行 run */
  useEffect(() => {
    run();
    return () => {
      runCount.current += 1;
    };
  }, [count]);

  /* deps 变化后，重新 reload */
  useUpdateEffect(() => {
    reload();
  }, deps);

  return {
    data,
    loading: loading && page === 1,
    loadingMore: loading && page > 1,
    reload,
    loadMore,
    total,
    noMore: !!total && data.length >= total,
  };
}
