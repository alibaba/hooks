/**
 * title: pass in the DOM element
 * desc: pass in the DOM element itself
 *
 * title.zh-CN: 监听提前渲染节点
 * desc.zh-CN: 直接传入 dom 节点
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
