/**
 * title: Image full screen
 *
 * title.zh-CN: 图片全屏
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useFullscreen } from 'ahooks';
import img from './react-hooks.jpg';

export default () => {
  const [, { enterFullscreen }] = useFullscreen(() => document.getElementById('fullscreen-img'));

  return (
    <Space style={{ background: 'white' }} direction="vertical">
      <img id="fullscreen-img" src={img} style={{ width: 320 }} />
      <Button onClick={enterFullscreen}>enterFullscreen</Button>
    </Space>
  );
};
