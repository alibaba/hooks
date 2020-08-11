/**
 * title: Dynamic binding
 * desc: Dynamic binding element.
 *
 * title.zh-CN: 动态绑定
 * desc.zh-CN: 动态绑定元素
 */

import React, { useRef } from 'react';
import { useInViewport, useToggle } from 'ahooks';

export default () => {
  const [bind, { toggle }] = useToggle(false);
  const ref = useRef();
  const inViewPort = useInViewport(ref);
  return (
    <div>
      {bind ? (
        <div ref={ref} id="demo2">
          observer dom[bind]
        </div>
      ) : (
        <div id="demo2">observer dom[unbind]</div>
      )}
      <div style={{ marginTop: 70, color: inViewPort ? '#87d068' : '#f50' }}>
        {inViewPort ? 'visible' : 'hidden'}
      </div>
      <button onClick={() => toggle()}>{bind ? 'unbind' : 'bind'}</button>
    </div>
  );
};
