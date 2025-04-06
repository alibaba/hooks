/**
 * title: Basic usage
 * desc: Need to input the sticky positioning element target and the rolling container scrollTarget, ScrollTarget defaults to document
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 需要传入粘性定位元素target和滚动容器scrollTarget, scrollTarget默认为document
 *
 */

import React, { useRef, useState } from 'react';
import { useStickyFixed } from 'ahooks';

export default () => {
  const [topV, setTopV] = useState(0);

  const targetRef = useRef(null);
  const scrollTargetRef = useRef(null);

  const [isFixed] = useStickyFixed(targetRef, { scrollTarget: scrollTargetRef });

  const fixedStyle = { background: 'pink' };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        top: <input type="number" step={5} value={topV} onChange={(e) => setTopV(Number(e.target.value))} />
      </div>

      <div ref={scrollTargetRef} style={{ height: 200, width: 500, border: '1px solid #000', overflowY: 'scroll' }}>
        <div style={{ height: 100 }}>top content</div>
        <div
          ref={targetRef}
          style={{
            position: 'sticky',
            border: '2px dashed pink',
            top: topV,
            ...(isFixed && fixedStyle),
          }}>
          sticky dom
        </div>
        <div style={{ height: 200, marginTop: 50 }}>bottom content</div>
      </div>

      <div style={{ marginTop: 16 }}> isFixed :{`${isFixed}`}</div>
    </>
  );
};
