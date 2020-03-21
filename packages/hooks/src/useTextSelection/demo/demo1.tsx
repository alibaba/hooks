/**
 * title: Default usage
 * desc: Tracking content, size, position of user text selection
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: 获取用户当前选择的文本内容、大小及其相对于视口的位置。
 */

import React from 'react';
import { useTextSelection } from '@umijs/hooks';

export default () => {
  const selection = useTextSelection();
  return (
    <div>
      <p>
        请滑动你的鼠标在页面上随意选取文本~~~~~
      </p>
      <p>结果：{JSON.stringify(selection)}</p>
    </div>
  );
};
