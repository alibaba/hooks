/**
 * title: Default usage
 * desc: Using ref to listen to visible part ratio value of the node.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 使用 ref 监听节点在视图变化或者滚动时的可视区域百分比
 */

import React, { useRef } from 'react';
import { useVisibleRatio } from 'ahooks';

export default () => {
  const ref = useRef();
  const visibleRatio = useVisibleRatio(ref);
  return (
    <div>
      <div ref={ref} style={{ height: 200 }}>
        observer dom
      </div>
      <div style={{ marginTop: 70, color: visibleRatio > 0 ? '#87d068' : '#f50' }}>
        {visibleRatio}
      </div>
    </div>
  );
};
