/**
 * title: Basic usage
 * desc: This hook is exactly the same as useEffect, except it calls effect immediately.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 使用上与 useEffect 完全相同，但它会立刻执行副作用函数。
 */

import React, { useEffect, useRef, useState } from 'react';
import { useImmediateEffect } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);
  const shouldAlert = useRef(false);

  if (count > 0 && shouldAlert.current) {
    alert('FC start');
  }

  useImmediateEffect(() => {
    if (count > 0) {
      alert('immediate effect');
    }
  }, [count]);

  useEffect(() => {
    if (count > 0) {
      alert('effect');
    }
  }, [count]);

  if (count > 0 && shouldAlert.current) {
    alert('FC end');
    shouldAlert.current = false;
  }

  return (
    <button
      type="button"
      onClick={() => {
        setCount(count + 1);
        shouldAlert.current = true
      }}
    >
      reRender
    </button>
  );
};
