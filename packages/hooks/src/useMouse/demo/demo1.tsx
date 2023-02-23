/**
 * title: Default usage
 * description: Tracking cursor position.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 获取鼠标位置。
 */

import { useMouse } from 'ahooks';
import React from 'react';

export default () => {
  const mouse = useMouse();

  return (
    <div>
      <p>
        Client - x: {mouse.clientX}, y: {mouse.clientY}
      </p>
      <p>
        Page - x: {mouse.pageX}, y: {mouse.pageY}
      </p>
      <p>
        Screen - x: {mouse.screenX}, y: {mouse.screenY}
      </p>
    </div>
  );
};
