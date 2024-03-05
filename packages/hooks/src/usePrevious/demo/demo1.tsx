/**
 * title: Basic usage
 * description: Record the previous value.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 记录上次的 count 值
 */

import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { usePrevious } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <>
      <Space style={{ marginBottom: 8 }}>
        <Button onClick={() => setCount((c) => c + 1)}>Increase</Button>
        <Button onClick={() => setCount((c) => c - 1)}>Decrease</Button>
      </Space>
      <div>counter current value: {count}</div>
      <div>counter previous value: {previous}</div>
    </>
  );
};
