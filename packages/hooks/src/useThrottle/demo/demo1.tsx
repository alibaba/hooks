/**
 * title: Default usage
 * description: ThrottledValue will change every 500ms.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: ThrottledValue 每隔 500ms 变化一次。
 */

import React, { useState } from 'react';
import { Input } from 'antd';
import { useThrottle } from 'ahooks';

export default () => {
  const [value, setValue] = useState<string>();
  const throttledValue = useThrottle(value, { wait: 500 });

  return (
    <div>
      <Input
        style={{ marginBottom: 8 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
      />
      <p>throttledValue: {throttledValue}</p>
    </div>
  );
};
