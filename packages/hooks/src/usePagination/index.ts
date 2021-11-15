import { useMemo } from 'react';
import { useMemoizedFn, useRequest, useUpdateEffect } from '..';
import type { Data, PaginationOptions, Params, Service } from './types';

const usePagination = <TData extends Data, TParams extends any[] = Params>(
  service: Service<TData, TParams>,
  options: PaginationOptions<TData, TParams> = {},
) => {
  const { refreshDeps = [], defaultPageSize = 10, ...rest } = options;

  const result = useRequest(service, {
    defaultParams: [{ current: 1, pageSize: defaultPageSize }],
    ...rest,
  });

  const { current = 1, pageSize = defaultPageSize } = result.params[0] || {};

  const total = result.data?.total || 0;
  const totalPage = useMemo(() => Math.ceil(total / pageSize), [pageSize, total]);

  const onChange = (c: number, p: number) => {
    let toCurrent = c <= 0 ? 1 : c;
    const toPageSize = p <= 0 ? 1 : p;
    const tempTotalPage = Math.ceil(total / toPageSize);
    if (toCurrent > tempTotalPage) {
      toCurrent = Math.max(1, tempTotalPage);
    }

    const [oldPaginationParams = {}, ...restParams] = result.params || [];

    result.run(
      {
        ...oldPaginationParams,
        current: toCurrent,
        pageSize: toPageSize,
      },
      ...restParams,
    );
  };

  const changeCurrent = (c: number) => {
    onChange(c, pageSize);
  };

  const changePageSize = (p: number) => {
    onChange(current, p);
  };

  useUpdateEffect(() => {
    if (!options.manual) {
      changeCurrent(1);
    }
  }, [...refreshDeps]);

  return {
    ...result,
    pagination: {
      current,
      pageSize,
      total,
      totalPage,
      onChange: useMemoizedFn(onChange),
      changeCurrent: useMemoizedFn(changeCurrent),
      changePageSize: useMemoizedFn(changePageSize),
    },
  };
};

export default usePagination;
