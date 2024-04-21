/**
 * title: Default usage
 * description: DebouncedValue will change after the input ends 500ms.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: DebouncedValue 只会在输入结束 500ms 后变化。
 */

import React, { useState } from 'react';
import { Input, Space } from 'antd';
import { useDebounce } from 'ahooks';

export default () => {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, {
    wait: 500,
  });

  return (
    <Space direction="vertical">
      <p>debounced value: {debouncedValue}</p>
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Typed value" />
    </Space>
  );
};
