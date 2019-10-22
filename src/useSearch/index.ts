import { DependencyList, useState, useMemo, useRef, useCallback } from 'react';
import useUpdateEffect from '../useUpdateEffect';

import useAsync from '../useAsync';

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

export default function useAntdSearch<Result>(
  fn: (value: any) => Promise<Result>,
  deps: DependencyList = [],
  options: Options = {},
): ReturnValue<Result> {
  const [value, setValue] = useState<any>('');

  const timer = useRef<any>();

  const { loading, data, run, cancel: cancelAsync } = useAsync<Result>(fn, [value, ...deps], {
    manual: true,
  });

  const wait: number = useMemo(() => (options.wait === undefined ? 300 : options.wait), [
    options.wait,
  ]);

  /* value 变化时，需要防抖 */
  useUpdateEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      run(value);
    }, wait);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [value]);

  /* 依赖变化时，需要立即重新请求 */
  useUpdateEffect(() => {
    run(value);
  }, deps);

  const cancel = useCallback(() => {
    /* 先取消防抖 */
    if (timer.current) {
      clearTimeout(timer.current);
    }
    /* 再取消 async */
    cancelAsync();
  }, [cancelAsync]);

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
