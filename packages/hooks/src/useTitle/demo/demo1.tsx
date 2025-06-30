/**
 * title: Basic usage
 * description: Set title of the page.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 设置页面标题。
 */

import React from 'react';
import { useTitle } from 'ahooks';

export default () => {
  useTitle('Page Title');

  return <p>Set title of the page.</p>;
};
