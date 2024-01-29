/**
 * title: Get responsive info in components
 * desc: By calling useMediaQuery in components, you can retrieve the responsive infomation of the browser page and subscribe to it at the same time.
 *
 * title.zh-CN: 在组件中获取响应式信息
 * desc.zh-CN: 在组件中调用 useMediaQuery 可以获取并订阅浏览器窗口的响应式信息。
 */

import React from 'react';
import { useMediaQuery } from 'ahooks';

export default function () {
  const [value, currentQuery] = useMediaQuery(
    ['(min-width: 1024px)', '(min-width: 768px)', '(min-width: 320px)'],
    [3, 2, 1],
    0,
  );

  return (
    <div>
      <div>Device: {value.toString()}</div>
      <div>currentQuery: {currentQuery}</div>
    </div>
  );
}
