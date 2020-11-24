/**
 * title: Default usage
 * desc: sets title of the page.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 设置页面标题
 */

import React from 'react';
import { useTitle } from 'ahooks';

export default () => {
  useTitle('Page Title');

  return (
    <div>
      <p>sets title of the page.</p>
    </div>
  );
};
