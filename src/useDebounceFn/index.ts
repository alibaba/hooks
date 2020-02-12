/**
 * 方法防抖
 */
import { DependencyList, useCallback, useEffect, useRef } from 'react';

import useUpdateEffect from '../useUpdateEffect';

type noop = (...args: any[]) => any;

/**
 * 返回值
 */
export interface ReturnValue<T extends any[]> {
  run: (...args: T) => void;
  cancel: () => void;
}

/**
 * 方法的重载
 * 定义防抖的方法
 * 规定泛型的类型： T 为一个任意类型的数组
 * @param fn： 一个方法Function
 * @param wait  需要等待的时间： number类型
 *
 * 返回值： 是一个对象为ReturnValue
 */
function useDebounceFn<T extends any[]>(fn: (...args: T) => any, wait: number): ReturnValue<T>;

/**
 * 方法的重载
 * @param fn 一个方法Function
 * @param deps： 一个深度数组对象[]
 * @param wait 需要等待的时间： number类型
 */
function useDebounceFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: DependencyList,
  wait: number,
): ReturnValue<T>;

/**
 * 方法的重载及实现
 * @param fn 一个方法Function
 * @param deps： 一个深度数组对象[]
 * @param wait 需要等待的时间： number类型
 */
function useDebounceFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: DependencyList | number,
  wait?: number,
): ReturnValue<T> {
  //  as DependenceyLisr
  const _deps: DependencyList = (Array.isArray(deps) ? deps : []) as DependencyList;

  //  _wait 等待时间
  const _wait: number = typeof deps === 'number' ? deps : wait || 0;

  const timer = useRef<any>();

  const fnRef = useRef<noop>(fn);
  fnRef.current = fn;

  //  当time: 定时器存在，则执行清楚操作
  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  // 执行运行操作： 防抖；1. 先做清楚操作； 2. 等到开始
  /**
   * 当_wait, cancel改变时，执行
   */
  const run = useCallback(
    (...args: any) => {
      cancel();
      timer.current = setTimeout(() => {
        fnRef.current(...args);
      }, _wait);
    },
    [_wait, cancel],
  );

  // 执行初始化useEffect， 性能封装
  // 初始化计时器
  useUpdateEffect(() => {
    run();
    return cancel;
  }, [..._deps, run]);

  // 初始化执行cancel功能
  useEffect(() => cancel, []);

  return {
    run,
    cancel,
  };
}

export default useDebounceFn;
