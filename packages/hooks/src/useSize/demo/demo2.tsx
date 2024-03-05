/**
 * title: Pass in the DOM element
 * description: useSize can receive a dom element as parameter. In SSR scenarios, you can pass in function `() => dom`.
 *
 * title.zh-CN: 传入 DOM 元素
 * description.zh-CN: useSize 可以接收 dom，在 SSR 场景可以传入函数 `() => dom`。
 */

import React from 'react';
import { useSize } from 'ahooks';

export default () => {
  const size = useSize(document.querySelector('body'));

  return (
    <div>
      <p>Try to resize the preview window </p>
      <p>
        width: {size?.width}px, height: {size?.height}px
      </p>
    </div>
  );
};
