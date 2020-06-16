import { DependencyList, useCallback, useMemo, useState } from 'react';
import useAsync from '../useAsync';
import useDebounceFn from '../useDebounceFn';
import useUpdateEffect from '../useUpdateEffect';


export interface ReturnValue<T> {
  loading: boolean;
  data?: T;
  value: any;
  onChange: (value: any) => void;
  cancel: () => void;
  run: () => void;
}

export interface Options {
  wait?: number;
}

function useSearch<Result>(
  fn: (value: any) => Promise<Result>,
  options?: Options,
): ReturnValue<Result>;
function useSearch<Result>(
  fn: (value: any) => Promise<Result>,
  deps?: DependencyList,
  options?: Options,
): ReturnValue<Result>;
function useSearch<Result>(
  fn: (value: any) => Promise<Result>,
  deps?: DependencyList | Options,
  options?: Options,
): ReturnValue<Result> {
  const _deps: DependencyList = (Array.isArray(deps) ? deps : []) as DependencyList;
  const _options: Options = (typeof deps === 'object' && !Array.isArray(deps)
    ? deps
    : options || {}) as Options;

  const [value, setValue] = useState<any>('');

  const { loading, data, run, cancel: cancelAsync } = useAsync<Result>(fn, [value, ..._deps], {
    manual: true,
  });

  const wait: number = useMemo(() => (_options.wait === undefined ? 300 : _options.wait), [
    _options.wait,
  ]);

  const debounce = useDebounceFn(
    () => {
      run(value);
    },
    [value],
    wait,
  );

  /* 依赖变化时，需要立即重新请求 */
  useUpdateEffect(() => {
    run(value);
  }, _deps);

  const cancel = useCallback(() => {
    /* 先取消防抖 */
    debounce.cancel();
    /* 再取消 async */
    cancelAsync();
  }, [cancelAsync, debounce.cancel]);

  /* 手动触发 */
  const trigger = useCallback(() => {
    run(value);
  }, [run, value]);

  return {
    data,
    loading,
    value,
    onChange: setValue,
    cancel,
    run: trigger,
  };
}

export default useSearch;
