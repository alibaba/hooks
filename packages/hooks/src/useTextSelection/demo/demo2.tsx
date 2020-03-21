/**
 * title: Set 'element'  target。
 * desc: Specifies the text selection to listen for an element
 *
 * title.zh-CN: 指定监听 'element' 元素
 * desc.zh-CN: 指定监听某个元素的文本选取。
 */

import React from 'react';
import { useTextSelection } from '@umijs/hooks';

export default () => {
  const {
    text
  } = useTextSelection('#target-element');
  return (
    <div>
      <p id="target-element">
        只监听本段落的文本选取；
      </p>
      <p>结果：{text}</p>
    </div>
  );
};
