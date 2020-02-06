/**
 * title: Lazy load DOM element（used to subscibe to dom element renders after the hook）
 * desc: Pass in a function that returns the DOM element.
 *
 * title.zh-CN: 懒加载（用于监听同一组件内后渲染节点）
 * desc.zh-CN: 传入 function 来监听 dom 节点
 */

import React from 'react';
import {useInViewport} from '@umijs/hooks';

export default () => {
  const [inViewPort] = useInViewport(() => document.querySelector('#demo2'));
  return (
    <div>
      <div id="demo2">observer dom</div>
      <div style={{ marginTop: 70, color: inViewPort ? '#87d068' : '#f50' }}>
        {inViewPort ? 'visible' : 'hidden'}
      </div>
    </div>
  );
};
