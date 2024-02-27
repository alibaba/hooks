/**
 * title: Page full screen
 *
 * title.zh-CN: 页面全屏
 */

import React, { useRef } from 'react';
import { useFullscreen } from 'ahooks';

export default () => {
  const ref = useRef(null);
  const [isFullscreen, { toggleFullscreen, enterFullscreen, exitFullscreen }] = useFullscreen(ref, {
    pageFullscreen: true,
  });

  return (
    <div style={{ background: 'white' }}>
      <div ref={ref} style={{ background: '#4B6BCD', padding: 12 }}>
        <div style={{ marginBottom: 16 }}>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
        <button type="button" onClick={enterFullscreen}>
          enterFullscreen
        </button>
        <button type="button" onClick={exitFullscreen} style={{ margin: '0 8px' }}>
          exitFullscreen
        </button>
        <button type="button" onClick={toggleFullscreen}>
          toggleFullscreen
        </button>
      </div>
    </div>
  );
};
