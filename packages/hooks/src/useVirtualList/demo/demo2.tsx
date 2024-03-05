/**
 * title: Dynamic item height
 * description: Specify item height dynamically.
 *
 * title.zh-CN: 动态元素高度
 * description.zh-CN: 动态指定每个元素的高度。
 */

import React, { useMemo, useRef } from 'react';
import { useVirtualList } from 'ahooks';
import { Button, InputNumber, Space } from 'antd';

export default () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const originalList = useMemo(() => Array.from(Array(99999).keys()), []);

  const [value, onChange] = React.useState<number>(0);

  const [list, scrollTo] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: (i) => (i % 2 === 0 ? 42 + 8 : 84 + 8),
    overscan: 10,
  });

  return (
    <div>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'flex-end' }} wrap>
        <InputNumber
          style={{ width: 200 }}
          placeholder="line number"
          value={value}
          onChange={(val) => onChange(Number(val))}
        />
        <Button onClick={() => scrollTo(Number(value))}>Scroll to</Button>
      </Space>
      <div ref={containerRef} style={{ height: '300px', overflow: 'auto' }}>
        <div ref={wrapperRef}>
          {list.map((ele) => (
            <div
              style={{
                height: ele.index % 2 === 0 ? 42 : 84,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px dashed #ccc',
                borderRadius: 4,
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
