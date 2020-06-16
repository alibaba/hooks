/**
 * title: Lazy load DOM element（used to subscibe to dom element renders after the hook）
 * desc: pass in a function that returns the DOM element
 *
 * title.zh-CN: 懒加载（用于监听同一组件内后渲染节点）
 * desc.zh-CN: 传入 function 来监听 dom 节点
 */

import React from 'react';
import {useSize} from '@umijs/hooks';

export default () => {
  const [state] = useSize(() => document.querySelector('#demo2'));
  return (
    <div id="demo2">
      try to resize the preview window <br />
      dimensions -- width: {state.width} px, height: {state.height} px
    </div>
  );
};
