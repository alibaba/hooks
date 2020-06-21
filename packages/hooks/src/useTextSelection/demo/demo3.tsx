/**
 * title: Default usage
 * desc: Tracking content, size, position of user text selection
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: 获取用户当前选择的文本内容、大小及其相对于视口的位置。
 */

import React, { useRef } from 'react';
import { useTextSelection } from 'ahooks';

export default () => {
  const ref = useRef();
  const selection = useTextSelection(ref);
  return (
    <div>
      <div ref={ref}>
        <p>Please swipe your mouse to select any text on this paragraph.</p>
      </div>
      <p>Result：{JSON.stringify(selection)}</p>
    </div>
  );
};
