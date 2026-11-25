import { useMemo } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import useRequest from '../useRequest';

import type { Data, PaginationOptions, PaginationResult, Params, Service } from './types';

const usePagination = <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: PaginationOptions<TData, TParams> = {},
) => {
  const { defaultPageSize = 10, defaultCurrent = 1, ...rest } = options;

  const result = useRequest(service, {
    defaultParams: [{ current: defaultCurrent, pageSize: defaultPageSize }] as unknown as TParams,
    refreshDepsAction: () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      changeCurrent(1);
    },
    ...rest,
  });

  const params = result.params.length ? result.params : (options.defaultParams ?? []);
  const { current = defaultCurrent, pageSize = defaultPageSize } = params[0] || {};

  const total = result.data?.total || 0;
  const totalPage = useMemo(() => Math.ceil(total / pageSize), [pageSize, total]);

  const onChange = (c: number, p: number) => {
    let toCurrent = c <= 0 ? 1 : c;
    const toPageSize = p <= 0 ? 1 : p;
    const tempTotalPage = Math.ceil(total / toPageSize);
    if (result.data && toCurrent > tempTotalPage) {
      toCurrent = Math.max(1, tempTotalPage);
    }

    const [oldPaginationParams = {}, ...restParams] = params;

    result.run(
      ...([
        {
          ...oldPaginationParams,
          current: toCurrent,
          pageSize: toPageSize,
        },
        ...restParams,
      ] as TParams),
    );
  };

  const changeCurrent = (c: number) => {
    onChange(c, pageSize);
  };

  const changePageSize = (p: number) => {
    onChange(current, p);
  };

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
  } as PaginationResult<TData, TParams>;
};

export default usePagination;
