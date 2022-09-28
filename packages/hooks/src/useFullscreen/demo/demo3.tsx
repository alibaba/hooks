/**
 * title: browser full screen
 *
 * title.zh-CN: 浏览器全屏
 */

import React from 'react';
import { useFullscreen } from 'ahooks';

export default () => {
  const [, { toggleFullscreen }] = useFullscreen(() => document.getElementById('testFullscreen'), {
    isBrowserFullscreen: true,
  });
  return (
    <div style={{ background: 'white' }}>
      <div style={{ marginBottom: 16 }}>
        <div id="testFullscreen" style={{ background: '#2396ef', padding: 12 }}>
          <button type="button" onClick={toggleFullscreen}>
            toggleFullscreen
          </button>
        </div>
      </div>
    </div>
  );
};
