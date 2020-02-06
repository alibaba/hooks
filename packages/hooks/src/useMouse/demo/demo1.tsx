/**
 * title: Default usage
 * desc: Tracking cursor position.
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: 获取鼠标位置。
 */

import React, { useMemo } from 'react';
import {useMouse} from '@umijs/hooks';

export default () => {
  const mouse = useMouse();

  return <div>Mouse Pos: {JSON.stringify(mouse)}</div>;
};
