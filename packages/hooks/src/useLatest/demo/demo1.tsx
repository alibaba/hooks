/**
 * title: Basic usage
 * desc: useLatest always returns the latest value
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: useLatest 返回的永远是最新值
 */

import React, { useState, useEffect } from 'react';
import { useLatest } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);

  const latestCountRef = useLatest(count);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(latestCountRef.current + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p>count: {count}</p>
    </>
  );
};
