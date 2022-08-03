/**
 * title: Basic usage
 * desc: useOnce will only be executed once, and the execution time is earlier than useEffect
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: useOnce 只会执行一次，且执行时机早于useEffect
 */

import React, { useState } from 'react';
import { useOnce } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);

  useOnce(() => setCount(10));

  return (
    <>
      <p>count: {count}</p>
    </>
  );
};
