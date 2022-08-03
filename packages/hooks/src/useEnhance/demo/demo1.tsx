/**
 * title: Basic usage
 * desc: useEnhance can enhance useReducer to use some redux middleware
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: useEnhance 可以增强useReducer从而可以使用一些redux中间件
 */

import React, { useReducer } from 'react';
import { useEnhance } from 'ahooks';
import type { Reducer } from 'react';

export const reducer: Reducer<number, { type: 'inc' }> = (state, action) => {
  switch (action.type) {
    case 'inc':
      return state + 1;
    default:
      return state;
  }
};

export default () => {
  const [count, dispatch] = useEnhance(
    ...useReducer(reducer, 0),
    () => (next) => (action) => next(action),
  );
  return (
    <>
      <p onClick={() => dispatch({ type: 'inc' })}>count is: {count}</p>
    </>
  );
};
