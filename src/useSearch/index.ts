import { DependencyList, useState, useMemo } from 'react';
import { useDebounce } from 'react-use';
import useUpdateEffect from '../useUpdateEffect';

import useAsync from '../useAsync';

export interface ReturnValue<T> {
  loading: boolean;
  data?: T;
  value: any;
  onChange: (value: any) => void;
}

export interface Options {
  wait?: number;
}

export default function useAntdSearch<Result>(
  fn: (value: any) => Promise<Result>,
  deps: DependencyList = [],
  options: Options = {},
): ReturnValue<Result> {
  const [value, setValue] = useState<any>();

  const { loading, data, run } = useAsync<Result>(fn, [value, ...deps], {
    manual: true,
  });

  const wait: number = useMemo(() => (options.wait === undefined ? 300 : options.wait), [
    options.wait,
  ]);

  /* value 变化时，需要防抖 */
  useDebounce(
    () => {
      run(value);
    },
    wait,
    [value],
  );

  /* 依赖变化时，需要立即重新请求 */
  useUpdateEffect(() => {
    run(value);
  }, deps);

  return {
    data,
    loading,
    value,
    onChange: setValue,
  };
}
