/**
 * title: Using deps properly
 * desc: Use deps can achieve the same effect as run. If the deps changes, the function will be executed oevery 1000ms.
 *
 * title.zh-CN: 合理利用 deps
 * desc.zh-CN: 使用 deps 可以实现和 run 一样的效果。如果 deps 变化，会每隔 1000ms 执行一次相关函数。
 */

import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useThrottleFn } from '@umijs/hooks';

export default () => {
  const [value, setValue] = useState();
  const [throttleValue, setThrottleValue] = useState();

  const { cancel } = useThrottleFn(
    () => {
      setThrottleValue(value);
    },
    [value],
    1000,
  );

  return (
    <div>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ margin: '16px 0' }}>
        <Button onClick={cancel}>Cancel Throttle</Button>
      </p>
      <p>throttleValue: {throttleValue}</p>
    </div>
  );
};
