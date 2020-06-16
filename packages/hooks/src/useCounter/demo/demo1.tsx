/**
 * title: Default usage
 * desc: Simple count management example.
 *
 * title.zh-CN: 基础使用
 * desc.zh-CN: 简单的 count 管理示例。
 */

import { Button } from 'antd';
import React from 'react';
import { useCounter } from '@umijs/hooks';

export default () => {
  const [current, { inc, dec, set, reset }] = useCounter(100, { min: 1, max: 10 });

  return (
    <div>
      <p>{current} [max: 10; min: 0;]</p>
      <Button.Group>
        <Button onClick={() => { inc() }}>inc()</Button>
        <Button onClick={() => { dec() }}>dec()</Button>
        <Button onClick={() => { set(3) }}>set(3)</Button>
        <Button onClick={() => { reset() }}>reset()</Button>
      </Button.Group>
    </div>
  );
};
