/**
 * 截流
 * 采用hooks的方式便携式
 */
import { DependencyList, useCallback, useEffect, useRef } from 'react';

// 优化Effect更新的规则
// 第一次初始化时，打标记为true； 设置成true后，执行
import useUpdateEffect from '../useUpdateEffect';

// 声明一个方法
type noop = (...args: any[]) => any;

export interface ReturnValue<T extends any[]> {
  run: (...args: T) => void;
  cancel: () => void;
}

/**
 * 方法重载
 * @param fn
 * @param wait
 */
function useThrottleFn<T extends any[]>(fn: (...args: T) => any, wait: number): ReturnValue<T>;

/**
 * 方法重载
 * @param fn
 * @param deps
 * @param wait
 */
function useThrottleFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: DependencyList,
  wait: number,
): ReturnValue<T>;

function useThrottleFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: DependencyList | number,
  wait?: number,
): ReturnValue<T> {
  const _deps: DependencyList = (Array.isArray(deps) ? deps : []) as DependencyList;
  const _wait: number = typeof deps === 'number' ? deps : wait || 0;

  // 声明定时器
  const timer = useRef<any>();

  // 定义fn的ref
  const fnRef = useRef<noop>(fn);
  fnRef.current = fn;

  // 当前的Args数据的Ref
  const currentArgs = useRef<any>([]);

  // 清除定时器
  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = undefined;
  }, []);

  // 执行方法， useCallback性能处理
  const run = useCallback(
    (...args: any) => {
      currentArgs.current = args;
      // 如果timer当前对象不存在则执行
      if (!timer.current) {
        timer.current = setTimeout(() => {
          // 将当前的args传入fnRef;
          fnRef.current(...currentArgs.current);
          timer.current = undefined;
        }, _wait);
      }
    },
    [_wait, cancel],
  );

  // 初始化执行方法，当decps[]，run改变时执行
  /**
   * 封装Effect，优化Effect的更新
   */
  useUpdateEffect(() => {
    run();
  }, [..._deps, run]);

  // 首次执行时，执行清除定时器操作
  useEffect(() => cancel, []);

  return {
    run,
    cancel,
  };
}

export default useThrottleFn;
