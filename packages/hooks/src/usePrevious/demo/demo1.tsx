/**
 * title: Default usage
 * desc: Store the previous value.
 * 
 * title.zh-CN: 基本用法
 * desc.zh-CN: 记录上次的 count 值
 */

import React, { useState } from 'react';
import { Button } from 'antd';
import { usePrevious } from '@umijs/hooks';

export default () => {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);
  return (
    <>
      <div>counter current value: {count}</div>
      <div>counter previous value: {previous}</div>
      <Button.Group>
        <Button onClick={() => setCount(c => c + 1)}> increase </Button>
        <Button onClick={() => setCount(c => c - 1)}> decrease </Button>
      </Button.Group>
    </>
  );
};
