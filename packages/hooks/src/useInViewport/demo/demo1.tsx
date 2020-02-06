/**
 * title: Default usage
 * desc: Using ref to listen to visibility change.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 使用 ref 监听节点在视图变化或者滚动时是否在可视范围之内
 */

import React from 'react';
import {useInViewport} from '@umijs/hooks';

export default () => {
  const [inViewPort, ref] = useInViewport<HTMLDivElement>();
  return (
    <div>
      <div ref={ref}>observer dom</div>
      <div style={{ marginTop: 70, color: inViewPort ? '#87d068' : '#f50' }}>
        {inViewPort ? 'visible' : 'hidden'}
      </div>
    </div>
  );
};
