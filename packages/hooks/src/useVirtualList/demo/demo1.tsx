/**
 * title: Default usage
 * desc: render 100,000 items in a list.
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: 渲染大量数据
 */

import React from 'react';
import { useVirtualList } from '@umijs/hooks';

export default () => {
  const { list, containerProps, wrapperProps } = useVirtualList(Array.from(Array(99999).keys()), {
    overscan: 30,
    itemHeight: 60,
  });
  return (
    <>
      <div {...containerProps} style={{ height: '300px', overflow: 'auto' }}>
        <div {...wrapperProps}>
          {list.map((ele, index) => (
            <div
              style={{
                height: 52,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e8e8e8',
                marginBottom: 8,
              }}
              key={ele.index}
            >
              Row: {ele.data}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
