/**
 * title: Default usage
 * description: Observe if the element is visible.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 监听元素是否在可见区域内。
 */

import React, { useRef } from 'react';
import { useInViewport } from 'ahooks';

export default () => {
  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);

  return (
    <div>
      <div
        style={{
          width: 300,
          height: 300,
          overflow: 'scroll',
          border: '1px dashed #ccc',
          borderRadius: 4,
        }}
      >
        scroll here
        <div style={{ height: 800 }}>
          <div
            ref={ref}
            style={{
              height: 100,
              width: 100,
              border: '1px dashed #ccc',
              borderRadius: 4,
              marginTop: 80,
              textAlign: 'center',
            }}
          >
            observer dom
          </div>
        </div>
      </div>
      <div style={{ marginTop: 16, color: inViewport ? '#87d068' : '#f50' }}>
        inViewport: {inViewport ? 'visible' : 'hidden'}
      </div>
    </div>
  );
};
