/**
 * title: Default usage
 * desc: using ref to listen to size change
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 使用 ref 监听节点尺寸变化
 */

import React from 'react';
import {useSize} from '@umijs/hooks';

export default () => {
  const [state, ref] = useSize<HTMLDivElement>();
  return (
    <div ref={ref}>
      try to resize the preview window <br />
      dimensions -- width: {state.width} px, height: {state.height} px
    </div>
  );
};
