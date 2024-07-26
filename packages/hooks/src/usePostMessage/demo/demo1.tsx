/**
 * title: Default usage
 * desc: Update state or props, you can see the output in the console
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 更新 state 或 props，可以在控制台看到输出
 */

import { usePostMessage } from 'ahooks';
import React from 'react';

// create a component to test usePostMessage
const Demo = () => {
  const { message } = usePostMessage({});

  return <div id="main">{message.title}</div>;
};

export default Demo;
