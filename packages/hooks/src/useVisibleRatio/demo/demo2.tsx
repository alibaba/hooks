/**
 * title: Pass in DOM element
 * desc: Pass in a function that returns the DOM element.
 *
 * title.zh-CN: 传入 DOM 元素
 * desc.zh-CN: 传入 function 并返回一个 dom 元素
 */

import React from 'react';
import { useVisibleRatio } from 'ahooks';

export default () => {
  const visibleRatio = useVisibleRatio(() => document.querySelector('#demo2'));
  return (
    <div>
      <div id="demo2" style={{ height: 200 }}>
        observer dom
      </div>
      <div style={{ marginTop: 70, color: visibleRatio > 0 ? '#87d068' : '#f50' }}>
        {visibleRatio}
      </div>
    </div>
  );
};
