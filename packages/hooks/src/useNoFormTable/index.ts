import type {
  AntdTableOptions,
  AntdTableResult,
  Data,
  Params,
  Service,
} from '../useAntdTable/types';
import { useMemoizedFn, usePagination } from 'ahooks';
import { useEffect } from 'react';

const useNoFormTable = <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: AntdTableOptions<TData, TParams> = {},
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
   * 加载表格数据
   * @param initPagination 第一次加载表格的页码信息
   */
  const _reloadAndReset = (initPagination?: TParams[0]) => {
    const pagination = initPagination || {
      pageSize: options.defaultPageSize || 10,
      ...(params?.[0] || {}),
      current: 1,
    };

    // @ts-ignore
    run(pagination, defaultParams?.[1]);
  };

  //搜索第一页
  const submit = () => {
    _reloadAndReset();
  };

  //重置条件并到第一页
  const reset = () => {
    onReset?.();
    _reloadAndReset(isResetSorter ? defaultParams?.[0] : undefined);
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
  } as AntdTableResult<TData, TParams>;
};

export default useNoFormTable;
