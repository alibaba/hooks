/**
 * title: Listen specified area
 * desc: useTextSelection can receive dom or ref, for listen specified area.
 *
 * title.zh-CN: 监听特定区域文本选择
 * desc.zh-CN: useTextSelection 可以接收 dom 或 ref，指定监听区域。
 */

import React, { useRef } from 'react';
import { useTextSelection } from 'ahooks';

export default () => {
  const ref = useRef(null);
  const selection = useTextSelection(ref);
  return (
    <div>
      <div ref={ref} style={{ border: '1px solid', padding: 20 }}>
        <p>Please swipe your mouse to select any text on this paragraph.</p>
      </div>
      <p style={{ wordWrap: 'break-word' }}>Result：{JSON.stringify(selection)}</p>
    </div>
  );
};
