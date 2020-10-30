/**
 * title: Default usage
 * desc: Use ref to set elements that need full screen
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 使用 ref 设置需要全屏的元素
 */

import React, { useRef } from 'react';
import { useFullscreen } from 'ahooks';

export default () => {
  const ref = useRef();
  const [isFullscreen, { setFull, exitFull, toggleFull }] = useFullscreen(ref);
  return (
    <div ref={ref} style={{ background: 'white' }}>
      <div style={{ marginBottom: 16 }}>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
      <div>
        <button type="button" onClick={setFull}>
          setFull
        </button>
        <button type="button" onClick={exitFull} style={{ margin: '0 8px' }}>
          exitFull
        </button>
        <button type="button" onClick={toggleFull}>
          toggle
        </button>
      </div>
    </div>
  );
};
