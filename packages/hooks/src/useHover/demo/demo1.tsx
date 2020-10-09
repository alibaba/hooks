/**
 * title: Default usage
 * desc: Use ref to set elements that need listen dom.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 使用 ref 设置需要需要监听的元素。
 */

import React, { useRef } from 'react';
import { useHover } from 'ahooks';

export default () => {
  const ref = useRef();
  const isHovering = useHover(ref);
  return <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>;
};
