/**
 * title: Default usage
 * desc: ThrottledValue will change every 500ms.
 *
 * title.zh-CN: 基础使用
 * desc.zh-CN: ThrottledValue 每隔 500ms 变化一次。
 */

import { Input } from 'antd';
import React, { useState } from 'react';
import { useThrottle } from '@umijs/hooks';

export default () => {
  const [value, setValue] = useState();
  const throttledValue = useThrottle(value, 500);

  return (
    <div>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>throttledValue: {throttledValue}</p>
    </div>
  );
};
