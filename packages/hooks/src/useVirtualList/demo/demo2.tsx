/**
 * title: Dynamic item height
 * desc: specify item height dynamically.
 *
 * title.zh-CN: 动态元素高度
 * desc.zh-CN: 动态指定每个元素的高度
 */

import React from 'react';
import { InputNumber, Button } from 'antd';
import { useVirtualList } from '@umijs/hooks';

export default () => {
  const [value, onChange] = React.useState<number>(undefined);
  const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
    Array.from(Array(99999).keys()),
    {
      itemHeight: i => (i % 2 === 0 ? 42 + 8 : 84 + 8),
      overscan: 10,
    },
  );
  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <InputNumber
          min={0}
          max={99999}
          style={{ width: 120 }}
          placeholder="line number"
          value={value}
          onChange={e => onChange(e)}
        />
        <Button
          style={{ marginLeft: 8 }}
          onClick={() => {
            scrollTo(Number(value));
          }}
        >
          scroll to
        </Button>
      </div>
      <div {...containerProps} style={{ height: '300px', overflow: 'auto' }}>
        <div {...wrapperProps}>
          {list.map((ele, index) => (
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
