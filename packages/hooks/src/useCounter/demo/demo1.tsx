/**
 * title: Basic usage
 * description: Simple example of counter management.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 简单的 counter 管理示例。
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useCounter } from 'ahooks';

export default () => {
  const [current, { inc, dec, set, reset }] = useCounter(100, {
    min: 1,
    max: 10,
  });

  return (
    <div>
      <p>{current} [max: 10; min: 1;]</p>
      <Space wrap>
        <Button onClick={() => inc()}>inc()</Button>
        <Button onClick={() => dec()}>dec()</Button>
        <Button onClick={() => set(3)}>set(3)</Button>
        <Button onClick={reset}>reset()</Button>
      </Space>
    </div>
  );
};
