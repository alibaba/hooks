/**
 * title: Listen Page Scroll
 * desc: Try to scroll this webpage.
 *
 * title.zh-CN: 监测整页的滚动
 * desc.zh-CN: 尝试滚动一下页面。
 */

import React from 'react';
import { useIsScrolling } from 'ahooks';

export default () => {
  const isScrolling = useIsScrolling();
  return (
    <div>
      <div>{JSON.stringify(isScrolling)}</div>
    </div>
  );
};
