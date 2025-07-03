/**
 * title: Default usage
 * description: useMemoizedFn is the same as useCallback.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: useMemoizedFn 与 useCallback 可以实现同样的效果。
 */

import React, { useState, useCallback } from 'react';
import { Button, Space, message } from 'antd';
import { useMemoizedFn } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);

  const callbackFn = useCallback(() => {
    message.info(`Current count is ${count}`);
  }, [count]);

  const memoizedFn = useMemoizedFn(() => {
    message.info(`Current count is ${count}`);
  });

  return (
    <>
      <p>count: {count}</p>
      <div style={{ marginTop: 8 }}>
        <Button onClick={() => setCount((c) => c + 1)}>Add Count</Button>
      </div>
      <Space style={{ marginTop: 8 }}>
        <Button onClick={callbackFn}>Call callbackFn</Button>
        <Button onClick={memoizedFn}>Call memoizedFn</Button>
      </Space>
    </>
  );
};
