/**
 * title: Image full screen
 *
 * title.zh-CN: 图片全屏
 */

import { useFullscreen } from 'ahooks';
// @ts-ignore - Image import
import img from './react-hooks.jpg';

export default () => {
  const [, { enterFullscreen }] = useFullscreen(() => document.getElementById('fullscreen-img'));
  return (
    <div style={{ background: 'white' }}>
      <div style={{ marginBottom: 16 }}>
        <img id="fullscreen-img" src={img} style={{ width: 320 }} alt="" />
      </div>
      <button type="button" onClick={enterFullscreen}>
        enterFullscreen
      </button>
    </div>
  );
};
