/**
 * title: Default usage
 * desc: Use ref to set elements that need listen dom.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 使用 ref 设置需要需要监听的元素。
 */

import React from 'react';
import { useHover } from '@umijs/hooks';

export default () => {
  const [isHovering, hoverRef] = useHover<HTMLDivElement>();
  return <div ref={hoverRef}>{isHovering ? 'hover' : 'leaveHover'}</div>;
};
