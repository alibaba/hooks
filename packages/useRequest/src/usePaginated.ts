import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Filter, PaginationConfig, Sorter } from './antdTypes';
import {
  BasePaginatedOptions,
  PaginatedFormatReturn,
  PaginatedOptionsWithFormat,
  PaginatedParams,
  PaginatedResult,
} from './types';
import useAsync from './useAsync';
import useUpdateEffect from './utils/useUpdateEffect';

function usePaginated<R, Item, U extends Item = any>(
  service: (...p: PaginatedParams) => Promise<R>,
  options: PaginatedOptionsWithFormat<R, Item, U>,
): PaginatedResult<Item>;
function usePaginated<R, Item, U extends Item = any>(
  service: (...p: PaginatedParams) => Promise<PaginatedFormatReturn<Item>>,
  options: BasePaginatedOptions<U>,
): PaginatedResult<Item>;
function usePaginated<R, Item, U extends Item = any>(
  service: (...p: PaginatedParams) => Promise<R>,
  options: BasePaginatedOptions<U> | PaginatedOptionsWithFormat<R, Item, U>,
) {
  const { paginated, defaultPageSize = 10, refreshDeps = [], fetchKey, ...restOptions } = options;

  useEffect(() => {
    if (fetchKey) {
      console.error("useRequest pagination's fetchKey will not work!");
    }
  }, []);

  const { data, params, run, loading, ...rest }: any = useAsync(service, {
    defaultParams: [
      {
        current: 1,
        pageSize: defaultPageSize,
      },
    ],
    ...(restOptions as any),
  });

  const { current = 1, pageSize = defaultPageSize, sorter = {}, filters = {} } =
    params && params[0] ? params[0] : ({} as any);

  // 只改变 pagination，其他参数原样传递
  const runChangePaination = useCallback(
    (paginationParams: any) => {
      const [oldPaginationParams, ...restParams] = params;
      run(
        {
          ...oldPaginationParams,
          ...paginationParams,
        },
        ...restParams,
      );
    },
    [run, params],
  );

  const total = data?.total || 0;
  const totalPage = useMemo(() => Math.ceil(total / pageSize), [pageSize, total]);

  const onChange = useCallback(
    (c: number, p: number) => {
      let toCurrent = c <= 0 ? 1 : c;
      const toPageSize = p <= 0 ? 1 : p;

      const tempTotalPage = Math.ceil(total / toPageSize);
      if (toCurrent > tempTotalPage) {
        toCurrent = tempTotalPage;
      }
      runChangePaination({
        current: c,
        pageSize: p,
      });
    },
    [total, runChangePaination],
  );

  const changeCurrent = useCallback(
    (c: number) => {
      onChange(c, pageSize);
    },
    [onChange, pageSize],
  );

  const changePageSize = useCallback(
    (p: number) => {
      onChange(current, p);
    },
    [onChange, current],
  );

  const changeCurrentRef = useRef(changeCurrent);
  changeCurrentRef.current = changeCurrent;
  /* 分页场景下，如果 refreshDeps 变化，重置分页 */
  useUpdateEffect(() => {
    /* 只有自动执行的场景， refreshDeps 才有效 */
    if (!options.manual) {
      changeCurrentRef.current(1);
    }
  }, [...refreshDeps]);

  // 表格翻页 排序 筛选等
  const changeTable = useCallback(
    (p: PaginationConfig, f?: Filter, s?: Sorter) => {
      runChangePaination({
        current: p.current,
        pageSize: p.pageSize || defaultPageSize,
        filters: f,
        sorter: s,
      });
    },
    [filters, sorter, runChangePaination],
  );

  return {
    loading,
    data,
    params,
    run,
    pagination: {
      current,
      pageSize,
      total,
      totalPage,
      onChange,
      changeCurrent,
      changePageSize,
    },
    tableProps: {
      dataSource: data?.list || [],
      loading,
      onChange: changeTable,
      pagination: {
        current,
        pageSize,
        total,
      },
    },
    sorter,
    filters,
    ...rest,
  } as PaginatedResult<U>;
}

export default usePaginated;
