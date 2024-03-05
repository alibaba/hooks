/**
 * title: Default usage
 * description: Use ref to set elements that need full screen
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 使用 ref 设置需要全屏的元素
 */

import React, { useRef } from 'react';
import { Button, Space } from 'antd';
import { useFullscreen } from 'ahooks';

export default () => {
  const ref = useRef(null);
  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] = useFullscreen(ref);

  return (
    <div ref={ref} style={{ background: 'white' }}>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={enterFullscreen}>enterFullscreen</Button>
        <Button onClick={exitFullscreen}>exitFullscreen</Button>
        <Button onClick={toggleFullscreen}>toggleFullscreen</Button>
      </Space>
      <div>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
    </div>
  );
};
