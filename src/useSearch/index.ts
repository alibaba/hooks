import { DependencyList, useState } from 'react';
import { useDebounce, useUpdateEffect } from 'react-use';
import useAsync from '../useAsync';

export interface ReturnValue<T> {
  loading: boolean;
  data?: T;
  value: any;
  onChange: (s: any) => void;
}

export interface Options {
  wait?: number;
}

export default function useAntdSearch<Result>(
  fn: (string: any) => Promise<Result>,
  deps: DependencyList = [],
  options: Options = {},
): ReturnValue<Result> {
  const [value, setValue] = useState<any>();

  const { loading, data, run, cancel } = useAsync<Result>(fn, [value, ...deps], {
    initExecute: false,
  });

  const wait: number = options.wait === undefined ? 300 : options.wait;

  /* value 变化时，需要防抖 */
  useDebounce(
    () => {
      cancel();
      run(value);
    },
    wait,
    [value],
  );

  /* 依赖变化时，需要立即重新请求 */
  useUpdateEffect(() => {
    cancel();
    run(value);
  }, deps);

  return {
    data,
    loading,
    value,
    onChange: setValue,
  };
}
