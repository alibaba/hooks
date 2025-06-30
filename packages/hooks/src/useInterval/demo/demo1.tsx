/**
 * title: Basic usage
 * description: Execute once per 1000ms.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 每1000ms，执行一次
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
