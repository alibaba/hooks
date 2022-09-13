/**
 * title: Basic usage
 * desc: useMeasures can receive ref as argument
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: useMeasures 可以接收 ref 参数
 */

import React, { useRef } from 'react';
import { useMeasures } from 'ahooks';

export default () => {
  const ref = useRef(null);
  const { height, width, top, left, x, y, right, bottom } = useMeasures(ref);
  return (
    <div ref={ref}>
      <p>Try to scroll or resize the preview window </p>
      <p>x: {x}</p>
      <p>y: {y}</p>
      <p>top: {top}</p>
      <p>right: {right}</p>
      <p>bottom: {bottom}</p>
      <p>left: {left}</p>
      <p>width: {width}</p>
      <p>height: {height}</p>
    </div>
  );
};
