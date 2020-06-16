/**
 * title: Default usage
 * desc: Use ref to set elements that need full screen
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 使用 ref 设置需要全屏的元素
 */


import React from 'react';
import { Button } from 'antd';
import {useFullscreen} from '@umijs/hooks';

export default () => {
  const { ref, isFullscreen, setFull, exitFull, toggleFull } = useFullscreen<HTMLDivElement>();
  return (
    <div ref={ref} style={{ background: 'white' }}>
      <div style={{ marginBottom: 16 }}>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
      <Button.Group>
        <Button onClick={setFull}>setFull</Button>
        <Button onClick={exitFull}>exitFull</Button>
        <Button onClick={toggleFull}>toggle</Button>
      </Button.Group>
    </div>
  );
};
