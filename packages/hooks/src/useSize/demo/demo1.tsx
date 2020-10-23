/**
 * title: Default usage
 * desc: using ref to listen to size change
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 使用 ref 监听节点尺寸变化
 */

import React, { useRef } from 'react';
import { useSize } from 'ahooks';

export default () => {
  const ref = useRef();
  const size = useSize(ref);
  return (
    <div ref={ref}>
      try to resize the preview window <br />
      dimensions -- width: {size.width} px, height: {size.height} px
    </div>
  );
};
