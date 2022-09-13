/**
 * title: pass in the DOM element
 * desc: useMeasures can receive a dom element as parameter. In SSR scenarios, you can pass in function `() =>dom`
 *
 * title.zh-CN: 传入 DOM 元素
 * desc.zh-CN: useMeasures 可以接收 dom，在 SSR 场景可以传入函数 `() => dom`
 */

import React from 'react';
import { useMeasures } from 'ahooks';

export default () => {
  const { height, width, top, left, x, y, right, bottom } = useMeasures(
    document.querySelector('body'),
  );
  return (
    <div>
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
