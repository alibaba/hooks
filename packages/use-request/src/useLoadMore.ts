import useAsync from './useAsync';
import { LoadMoreParams, LoadMoreOptionsWithFormat, LoadMoreResult, LoadMoreFormatReturn, LoadMoreOptions } from './types';
import { useRef, useCallback, useMemo, useEffect, useState } from 'react';
import useUpdateEffect from './utils/useUpdateEffect';

function useLoadMore<R, Item, U extends Item = any>(
  service: (...p: LoadMoreParams) => Promise<R>,
  options: LoadMoreOptionsWithFormat<R, Item, U>
): LoadMoreResult<Item>
function useLoadMore<R, Item, U extends Item = any>(
  service: (...p: LoadMoreParams) => Promise<LoadMoreFormatReturn<Item>>,
  options: LoadMoreOptions<U>
): LoadMoreResult<Item>
function useLoadMore<R, Item, U extends Item = any>(
  service: (...p: LoadMoreParams) => Promise<R>,
  options: LoadMoreOptions<U> | LoadMoreOptionsWithFormat<R, Item, U>
): LoadMoreResult<Item> {

  const {
    refreshDeps = [],
    fetchKey,
    ...restOptions
  } = options;

  useEffect(() => {
    if (fetchKey) {
      console.warn(`useRequest loadMore's fetchKey will not work!`);
    }
  }, []);

  const [loadingMore, setLoadingMore] = useState(false);

  const { data, run, params, reset, loading, fetches, ...rest } = useAsync(
    service,
    {
      ...restOptions as any,
      fetchKey: (nextId) => {
        // 仅仅为了让 nextId 变成字符串，保证 object 的顺序
        return nextId + '-';
      },
      onSuccess: () => {
        setLoadingMore(false);
      }
    });

  const reload = useCallback(() => {
    reset();
    const [_, ...rest] = params;
    run(undefined, ...rest);
  }, [run, reset, params])

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
    let listGroup: Item[] = [];
    Object.values(fetches).forEach((h: any) => {
      if (h.data?.list) {
        listGroup = listGroup.concat(h.data?.list);
      }
    });
    return {
      ...data,
      list: listGroup
    };
  }, [fetches, data]);

  const loadMore = useCallback(() => {
    setLoadingMore(true);
    const [_, ...rest] = params;
    run(data.nextId, ...rest);
  }, [run, data, params])

  return {
    data: dataGroup,
    run,
    params,
    reset,
    loading: loading && dataGroup.list.length === 0,
    loadMore,
    loadingMore,
    fetches,
    ...rest,
  } as any;
}

export default useLoadMore;