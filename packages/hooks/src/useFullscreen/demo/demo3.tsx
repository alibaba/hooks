/**
 * title: Page full screen
 *
 * title.zh-CN: 页面全屏
 */

import React from 'react';
import { useFullscreen } from 'ahooks';

export default () => {
  const [, { toggleFullscreen }] = useFullscreen(() => document.getElementById('testFullscreen'), {
    pageFullscreen: true,
  });

  return (
    <div style={{ background: 'white' }}>
      <div style={{ marginBottom: 16 }}>
        <div id="testFullscreen" style={{ background: '#4B6BCD', padding: 12 }}>
          <button type="button" onClick={toggleFullscreen}>
            toggleFullscreen
          </button>
        </div>
      </div>
    </div>
  );
};
