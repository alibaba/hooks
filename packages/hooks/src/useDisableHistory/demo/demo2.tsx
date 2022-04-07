/**
 * title: Usage of incoming arguments
 * desc: useDisableHistory disable browser forward and backward
 *
 * title.zh-CN: 传入参数用法
 * desc.zh-CN: useDisableHistory 禁止浏览器前进后退
 */

import { useDisableHistory } from 'ahooks';
import React from 'react';

export default () => {
  // 1.点击其他链接，例如点击“快速上手”
  // 2.点击useDisableHistory，点击 back 按钮
  useDisableHistory({
    callback: () => {
      // do something here
      console.log('useDisableHistory callback trigger');
    },
    url: document.URL,
    shouldRefresh: true, // refresh current page
  });

  return (
    <div>
      <button onClick={() => window.history.back()} style={{ margin: '0 8px' }}>
        back
      </button>
      <button onClick={() => window.history.forward()}>forward</button>
    </div>
  );
};
