/**
 * title: Pass in DOM element
 * desc: Pass in a function that returns the DOM element.
 *
 * title.zh-CN: 传入 DOM 元素
 * desc.zh-CN: 传入 function 并返回一个 dom 元素。
 *
 */

import React, { useState } from 'react';
import { useStickyFixed } from 'ahooks';

export default () => {
  const [topV, setTopV] = useState(0);

  const [isFixed] = useStickyFixed(() => document.getElementById('target'), {
    scrollTarget: () => document.getElementById('scrollTarget'),
  });

  const fixedStyle = { background: 'pink' };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        top: <input type="number" step={5} value={topV} onChange={(e) => setTopV(Number(e.target.value))} />
      </div>

      <div id="scrollTarget" style={{ height: 200, width: 500, border: '1px solid #000', overflowY: 'scroll' }}>
        <div style={{ height: 100 }}>top content</div>
        <div
          id="target"
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
