/**
 * title: Default usage
 * desc: Simple count management example.
 *
 * title.zh-CN: 基础使用
 * desc.zh-CN: 简单的 count 管理示例。
 */

import React from 'react';
import { useCounter } from 'ahooks';

export default () => {
  const [current, { inc, dec, set, reset }] = useCounter(100, { min: 1, max: 10 });

  return (
    <div>
      <p>{current} [max: 10; min: 0;]</p>
      <div>
        <button type="button" onClick={() => { inc() }}>inc()</button>
        <button type="button" onClick={() => { dec() }}>dec()</button>
        <button type="button" onClick={() => { set(3) }}>set(3)</button>
        <button type="button" onClick={() => { reset() }}>reset()</button>
      </div>
    </div>
  );
};
