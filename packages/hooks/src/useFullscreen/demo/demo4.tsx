/**
 * title: Coexist with other full screen operations
 * description: The element's full screen may be modified by other scripts, don't worry, ahooks can work with them.
 *
 * title.zh-CN: 与其它全屏操作共存
 * description.zh-CN: 元素的全屏情况可能被其它脚本修改，不用担心，ahooks 可以与它们共存。
 */

import React, { useRef } from 'react';
import { useFullscreen } from 'ahooks';
import { Button, Space } from 'antd';

function vanillaToggleFullscreen(element) {
  const isFullscreen = !!document.fullscreenElement;

  if (isFullscreen) {
    document.exitFullscreen();
  } else {
    element.requestFullscreen();
  }
}

export default () => {
  const ref = useRef(null);
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(ref);

  return (
    <div ref={ref} style={{ background: 'white' }}>
      <Space style={{ marginBottom: 16 }} wrap>
        <Button onClick={toggleFullscreen}>ahooks - Toggle Fullscreen</Button>
        <Button onClick={() => vanillaToggleFullscreen(ref.current)}>
          vanilla - Toggle Fullscreen
        </Button>
      </Space>
      <div>{isFullscreen ? 'Fullscreen' : 'Not Fullscreen'}</div>
    </div>
  );
};
