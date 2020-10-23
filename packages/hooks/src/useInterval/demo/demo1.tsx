/**
 * title: Default usage
 * desc: Every 1000ms, execute once
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 每1000ms，执行一次
 */

import React, { useState } from 'react';
import { useInterval } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return <div>count: {count}</div>;
};
