/**
 * title: Basic usage
 * desc: Execute after 2000ms.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 在 2000ms 后执行。
 */

import React, { useState } from 'react';
import { useRafTimeout } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);

  useRafTimeout(() => {
    setCount(count + 1);
  }, 2000);

  return <div>count: {count}</div>;
};
