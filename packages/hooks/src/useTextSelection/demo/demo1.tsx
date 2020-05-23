/**
 * title: Set 'dom'  target。
 * desc: Specifies the text selection to listen for an dom
 *
 * title.zh-CN: 指定监听 'dom' 元素
 * desc.zh-CN: 指定监听某个元素的文本选取。
 */

import React from 'react';
import { useTextSelection } from 'ahooks';

export default () => {
  const { text } = useTextSelection(() => document.querySelector('#target-dom'));
  return (
    <div>
      <p id="target-dom">
      Only listen to the text selection of this paragraph.
      </p>
      <p>Result：{text}</p>
    </div>
  );
};
