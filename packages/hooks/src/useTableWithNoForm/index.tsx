import { AntdTableOptions, AntdTableResult, Data, Params, Service } from '../useAntdTable/types';
import { useMemoizedFn, usePagination } from 'ahooks';
import { useEffect } from 'react';

const useAmadeusTable = <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: AntdTableOptions<TData, TParams> = {},
) => {
  const { ...rest } = options;

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

  const _submit = (initPagination?: TParams[0]) => {
    const pagination = initPagination || {
      pageSize: options.defaultPageSize || 10,
      ...(params?.[0] || {}),
      current: 1,
    };

    // @ts-ignore
    run(pagination);
  };

  const submit = (e?: any) => {
    e?.preventDefault?.();
    _submit();
  };

  const reset = () => {
    _submit();
  };

  useEffect(() => {
    _submit();
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

export default useAmadeusTable;
