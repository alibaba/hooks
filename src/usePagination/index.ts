import { useState, useEffect, useCallback, DependencyList, useMemo } from 'react';
import useAsync from '../useAsync';
import useUpdateEffect from '../useUpdateEffect';

export interface ReturnValue<Item> {
  data: Item[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPage: number;
    onChange: (current: number, pageSize: number) => void;
    changeCurrent: (current: number) => void;
    changePageSize: (pageSize: number) => void;
  };
  refresh: () => void;
}

export interface FormattedResult<Item> {
  current?: number;
  pageSize?: number;
  total: number;
  data: Item[];
}

export interface Options<Result, Item> {
  defaultPageSize?: number;
  formatResult?: (result: Result) => FormattedResult<Item>;
}

export interface FnParams {
  current: number;
  pageSize: number;
  [key: string]: any;
}

function usePagination<Result, Item>(
  fn: (params: FnParams) => Promise<Result>,
  options?: Options<Result, Item>,
): ReturnValue<Item>;
function usePagination<Result, Item>(
  fn: (params: FnParams) => Promise<Result>,
  deps?: DependencyList,
  options?: Options<Result, Item>,
): ReturnValue<Item>;
function usePagination<Result, Item>(
  fn: (params: FnParams) => Promise<Result>,
  deps?: DependencyList | Options<Result, Item>,
  options?: Options<Result, Item>,
): ReturnValue<Item> {
  const _deps: DependencyList = (Array.isArray(deps) ? deps : []) as DependencyList;
  const _options: Options<Result, Item> = (typeof deps === 'object' && !Array.isArray(deps)
    ? deps
    : options || {}) as Options<Result, Item>;
  const { defaultPageSize = 10, formatResult } = _options;

  const [data, setData] = useState<Item[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  const [count, setCount] = useState(0);

  // let shamFn!: (params: FnParams) => Promise<FormattedResult<Item>>;

  // if (Array.isArray(fn)) {
  //   shamFn = (params) => {
  //     return new Promise((resolve) => {
  //       resolve({
  //         data: fn.slice((params.current - 1) * params.pageSize, params.current * params.pageSize),
  //         total: fn.length
  //       });
  //     });
  //   }
  // }

  const { run, loading } = useAsync(fn, _deps, {
    manual: true,
  });

  useEffect(() => {
    run({
      current,
      pageSize,
    }).then(res => {
      if (!res) {
        return;
      }
      const formattedResult = formatResult
        ? formatResult(res)
        : ((res as unknown) as FormattedResult<Item>);
      if (formattedResult) {
        if (typeof formattedResult.total === 'number') setTotal(formattedResult.total);
        if (formattedResult.data) setData(formattedResult.data);
        if (typeof formattedResult.current === 'number') setCurrent(formattedResult.current);
        if (typeof formattedResult.pageSize === 'number') setPageSize(formattedResult.pageSize);
      }
    });
  }, [current, pageSize, count]);

  useUpdateEffect(() => {
    setCurrent(1);
    setCount(c => c + 1);
  }, _deps);

  const totalPage = useMemo(() => Math.ceil(total / pageSize), [pageSize, total]);

  const onChange = useCallback(
    (c: number, p: number) => {
      let toCurrent = c <= 0 ? 1 : c;
      const toPageSize = p <= 0 ? 1 : p;

      const tempTotalPage = Math.ceil(total / toPageSize);
      if (toCurrent > tempTotalPage) {
        toCurrent = tempTotalPage;
      }
      setCurrent(toCurrent);
      setPageSize(toPageSize);
    },
    [total],
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

  const refresh = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return {
    data,
    loading,

    pagination: {
      current,
      pageSize,
      total,
      totalPage,
      onChange,
      changeCurrent,
      changePageSize,
    },
    refresh,
  };
}

export default usePagination;
