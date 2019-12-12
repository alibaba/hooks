import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult } from 'antd/lib/table';
import { useCallback, useMemo, useRef } from 'react';
import useUpdateEffect from '../useUpdateEffect';
import { BasePaginatedOptions, PaginatedFormatReturn, PaginatedOptionsWithFormat, PaginatedParams, PaginatedResult } from './types';
import useAsync from './useAsync';

const isEqual = require('lodash.isequal');

function usePaginated<T, Item>(
  service: (params: PaginatedParams<Item>) => Promise<T>,
  options: PaginatedOptionsWithFormat<T, Item>
): PaginatedResult<PaginatedFormatReturn<Item>, Item>
function usePaginated<T extends PaginatedFormatReturn<Item>, Item>(
  service: (params: PaginatedParams<Item>) => Promise<T>,
  options: BasePaginatedOptions<T, Item>
): PaginatedResult<T, Item>
function usePaginated<T, Item>(
  service: (params: PaginatedParams<Item>) => Promise<T>,
  options: BasePaginatedOptions<T, Item> | PaginatedOptionsWithFormat<T, Item>
) {

  const {
    defaultPageSize = 10,
    loadMorePageSize = defaultPageSize,
    refreshDeps = [],
    ...restOptions
  } = options;

  const { data, params, run, loading, ...rest } = useAsync(service, {
    ...restOptions,
    defaultParams: [{
      current: 1,
      pageSize: defaultPageSize
    }]
  });

  const current = params ? params[0].current : 1;
  const pageSize = params ? params[0].pageSize : defaultPageSize;
  const sorter = params ? params[0].sorter : undefined;
  const filters = params ? params[0].filters : undefined;

  const total = data ? (data as any).pager?.total : 0;
  const totalPage = useMemo(() => Math.ceil(total / pageSize), [pageSize, total]);

  const pageSizeRef = useRef(pageSize);
  pageSizeRef.current = pageSize;

  const runRef = useRef(run);
  runRef.current = run;

  /* 分页场景下，如果 refreshDeps 变化，重置分页 */
  useUpdateEffect(() => {
    runRef.current({
      current: 1,
      pageSize: pageSizeRef.current
    });
  }, [...refreshDeps]);


  const onChange = useCallback(
    (c: number, p: number) => {
      let toCurrent = c <= 0 ? 1 : c;
      const toPageSize = p <= 0 ? 1 : p;

      const tempTotalPage = Math.ceil(total / toPageSize);
      if (toCurrent > tempTotalPage) {
        toCurrent = tempTotalPage;
      }
      run({
        current: c,
        pageSize: p
      });
    },
    [total, run],
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

  // 表格翻页 排序 筛选等
  const changeTable = useCallback(
    (
      p: PaginationConfig,
      f?: Record<keyof Item, string[]>,
      s?: SorterResult<Item>,
    ) => {
      // antd table 的初始状态 filter 带有 null 字段，需要先去除后再比较
      const realFilter = { ...f };
      Object.entries(realFilter).forEach(item => {
        if (item[1] === null) {
          delete (realFilter as Object)[item[0] as keyof Object];
        }
      });
      /* 如果 filter，或者 sort 变化，就初始化 current */
      const needReload =
        !isEqual(realFilter, filters) ||
        s?.field !== sorter?.field ||
        s?.order !== sorter?.order;

      run({
        current: needReload ? 1 : (p.current || 1),
        pageSize: p.pageSize || defaultPageSize,
        filters: f,
        sorter: s,
      });
    },
    [filters, sorter],
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
      dataSource: (data as any)?.list,
      loading,
      onChange: changeTable,
      pagination: {
        current: current,
        pageSize: pageSize,
        total: total,
      },
    },
    sorter,
    filters,
    ...rest
  }
}

export default usePaginated;