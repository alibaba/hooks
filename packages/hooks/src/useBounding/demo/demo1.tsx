/**
 * title: Basic usage
 * desc: Try to scroll the page or resize window or resize element.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 尝试一下滚动页面、改变窗口大小 或 改变元素大小。
 */

import React, { useRef } from 'react';
import { useBounding } from 'ahooks';

export default () => {
  const ref = useRef(null);
  const rect = useBounding(ref);

  return (
    <div>
      <div
        ref={ref}
        style={{
          resize: 'both',
          overflow: 'auto',
          width: '100%',
          height: 100,
          border: '1px solid #666',
        }}
      >
        {JSON.stringify(rect)}
      </div>
    </div>
  );
};