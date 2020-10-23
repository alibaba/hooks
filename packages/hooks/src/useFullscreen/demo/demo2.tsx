/**
 * title: Picture full screen
 * desc: Picture full screen
 *
 * title.zh-CN: 图片全屏
 * desc.zh-CN: 全屏图片
 */

import React from 'react';
import { useFullscreen } from 'ahooks';
import img from './react-hooks.jpg';

export default () => {
  const [, { setFull }] = useFullscreen(() => document.getElementById('fullscreen-img'));
  return (
    <div style={{ background: 'white' }}>
      <div style={{ marginBottom: 16 }}>
        <img id="fullscreen-img" src={img} style={{ width: 320 }} alt="" />
      </div>
      <button type="button" onClick={setFull}>
        setFull
      </button>
    </div>
  );
};
