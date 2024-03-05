/**
 * title: Page full screen
 *
 * title.zh-CN: 页面全屏
 */

import React, { useRef } from 'react';
import { Button, Card, Space } from 'antd';
import { useFullscreen } from 'ahooks';

export default () => {
  const ref = useRef(null);
  const [isFullscreen, { toggleFullscreen, enterFullscreen, exitFullscreen }] = useFullscreen(ref, {
    pageFullscreen: true,
  });

  return (
    <Card ref={ref} style={{ background: '#4b6bcd' }}>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={enterFullscreen}>enterFullscreen</Button>
        <Button onClick={exitFullscreen}>exitFullscreen</Button>
        <Button onClick={toggleFullscreen}>toggleFullscreen</Button>
      </Space>
      <div>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
    </Card>
  );
};
