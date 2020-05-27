/**
 * title: pass in the DOM element
 * desc: Pass in a function that returns the DOM element.
 *
 * title.zh-CN: 传入 DOM 元素
 * desc.zh-CN: 传入 function 并返回一个 dom 元素。
 */

import React from 'react';
import { useSize } from 'ahooks';

export default () => {
  const dom = document.querySelector('body');
  const size = useSize(dom);
  return (
    <div>
      try to resize the preview window <br />
      dimensions -- width: {size.width} px, height: {size.height} px
    </div>
  );
};
