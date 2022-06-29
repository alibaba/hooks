/**
 * title: Basic usage
 * desc: useSize can receive ref as argument
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: useSize 可以接收 ref 参数
 */

import React, { useRef } from 'react';
import { useSize } from 'ahooks';

export default () => {
  const ref = useRef(null);
  const size = useSize(ref);
  return (
    <div ref={ref}>
      <p>Try to resize the preview window </p>
      <p>
        width: {size?.width}px, height: {size?.height}px
      </p>
    </div>
  );
};
