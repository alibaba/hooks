import React, { useRef } from 'react';

/**
 * 用以存储上一个值
 */
export type compareFunction<T> = (prev: T | undefined, next: T) => boolean;

/**
 * 返回一个方法
 * state: 当前值
 * compare: 比对一下值compareFunction
 */
export default <T>(state: T, compare?: compareFunction<T>): T | undefined => {
  // 上一个值
  const prevRef = useRef<T>();
  // 当前值
  const curRef = useRef<T>();

  // 是否需要更新， 如果compare存在， 就用compare比较否则就用true；
  const needUpdate = typeof compare === 'function' ? compare(curRef.current, state) : true;

  // 需要更新则修改当前值，并且设置前一个值；
  if (needUpdate) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  // 返回上一个值
  return prevRef.current;
};
