/**
 * title: Dynamic item height
 * desc: specify item height dynamically.
 *
 * title.zh-CN: 动态元素高度
 * desc.zh-CN: 动态指定每个元素的高度
 */

import React from 'react';
import { useVirtualList } from 'ahooks';

export default () => {
  const [value, onChange] = React.useState<number>(0);
  const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
    Array.from(Array(99999).keys()),
    {
      itemHeight: (i) => (i % 2 === 0 ? 42 + 8 : 84 + 8),
      overscan: 10,
    },
  );

  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <input
          style={{ width: 120 }}
          placeholder="line number"
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <button
          style={{ marginLeft: 8 }}
          type="button"
          onClick={() => {
            scrollTo(Number(value));
          }}
        >
          scroll to
        </button>
      </div>
      <div {...containerProps} style={{ height: '300px', overflow: 'auto' }}>
        <div {...wrapperProps}>
          {list.map((ele) => (
            <div
              style={{
                height: ele.index % 2 === 0 ? 42 : 84,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e8e8e8',
                marginBottom: 8,
              }}
              key={ele.index}
            >
              Row: {ele.data} size: {ele.index % 2 === 0 ? 'small' : 'large'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
