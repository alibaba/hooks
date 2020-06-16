/**
 * title: Listen to pre-rendered DOM
 * desc: pass in the DOM element itself
 *
 * title.zh-CN: 监听提前渲染节点
 * desc.zh-CN: 直接传入 dom 节点
 */

import React from 'react';
import {useSize} from '@umijs/hooks';

export default () => {
  const [state] = useSize(document.querySelector('body'));
  return (
    <div>
      this demo is listening to body size change, try to resize the window instead <br />
      dimensions -- width: {state.width} px, height: {state.height} px
    </div>
  );
};
