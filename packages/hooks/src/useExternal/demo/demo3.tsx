/**
 * title: Load image
 * desc: Load a static image as external resources to page.
 *
 * title.zh-CN: 加载图片文件
 * desc.zh-CN: 加载一个静态图片作为外部资源引入页面
 */

import React from 'react';
import { useExternal } from 'ahooks';

export default () => {
  const ref = React.useRef();

  const [status, { toggle, load, unload }] = useExternal('/logo.svg', {
    target: ref,
    // target: document.querySelector('body')
  });

  return (
    <>
      <p>
        Status: <b>{status}</b>
      </p>
      <button type="button" style={{ marginRight: 8 }} onClick={() => toggle()}>
        toggle
      </button>
      <button type="button" style={{ marginRight: 8 }} onClick={() => unload()}>
        unload
      </button>
      <button type="button" style={{ marginRight: 8 }} onClick={() => load()}>
        load
      </button>
      <br />
      <br />
      <div ref={ref}></div>
    </>
  );
};
