/**
 * title: Default usage
 * description: ThrottledValue will change every 500ms.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: ThrottledValue 每隔 500ms 变化一次。
 */

import React, { useState } from 'react';
import { Input, Space } from 'antd';
import { useThrottle } from 'ahooks';

export default () => {
  const [value, setValue] = useState<string>();
  const throttledValue = useThrottle(value, { wait: 500 });

  return (
    <Space direction="vertical">
      <p>throttled value: {throttledValue}</p>
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Typed value" />
    </Space>
  );
};
