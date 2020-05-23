/**
 * title: Detect Whole Page Scroll
 * desc: Try to scroll this webpage.
 *
 * title.zh-CN: 监测整页的滚动
 * desc.zh-CN: 尝试滚动一下页面。
 */

import React from 'react';
import { useScroll } from 'ahooks';

export default () => {
  const scroll = useScroll(document);
  return (
    <div id="demo">
      <div>{JSON.stringify(scroll)}</div>
    </div>
  );
};
