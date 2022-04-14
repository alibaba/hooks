import type { Data, Params, Service } from '../useAntdTable/types';
import useMemoizedFn from '../useMemoizedFn';
import usePagination from '../usePagination';
import { useEffect } from 'react';
import type { NoFormTableOptions, NoFormTableResult } from './types';

export default <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: NoFormTableOptions<TData, TParams> = {},
) => {
  const { defaultParams, isResetSorter = false, onReset, ...rest } = options;

  const result = usePagination<TData, TParams>(service, {
    manual: true,
    ...rest,
  });

  const { params = [], run } = result;

  const onTableChange = (pagination: any, filters: any, sorter: any) => {
    const [oldPaginationParams, ...restParams] = params || [];

    run(
      // @ts-ignore
      {
        ...oldPaginationParams,
        current: pagination.current,
        pageSize: pagination.pageSize,
        filters,
        sorter,
      },
      ...restParams,
    );
  };

  /**
   * 使用默认条件回到第一页数据
   * @param initPagination 加载表格的页码信息
   * @param defaultCustomForm 默认的自定义表单值
   */
  const _reloadAndReset = (initPagination?: TParams[0], defaultCustomForm?: any) => {
    const pagination = initPagination || {
      pageSize: options.defaultPageSize || 10,
      ...(params?.[0] || {}),
      current: 1,
    };

    // @ts-ignore
    run(pagination, defaultCustomForm ?? defaultParams?.[1]);
  };

  /**
   * 使用当前表单条件回到第一页数据
   * @param customForm 自定义表单值
   */
  const submit = (customForm?: any) => {
    const pagination = {
      pageSize: options.defaultPageSize || 10,
      ...(params?.[0] || {}),
      current: 1,
    };

    // @ts-ignore
    run(pagination, customForm ?? defaultParams?.[1]);
  };

  /**
   * 重置条件并到第一页
   * @param defaultCustomForm 默认的自定义表单值
   */
  const reset = (defaultCustomForm?: any) => {
    onReset?.();
    _reloadAndReset(isResetSorter ? defaultParams?.[0] : undefined, defaultCustomForm);
  };

  useEffect(() => {
    _reloadAndReset(defaultParams?.[0]);
  }, []);

  return {
    ...result,
    tableProps: {
      dataSource: result.data?.list || [],
      loading: result.loading,
      onChange: useMemoizedFn(onTableChange),
      pagination: {
        current: result.pagination.current,
        pageSize: result.pagination.pageSize,
        total: result.pagination.total,
      },
    },
    search: {
      submit: useMemoizedFn(submit),
      reset: useMemoizedFn(reset),
    },
  } as NoFormTableResult<TData, TParams>;
};
