/**
 * title: Store state into localStorage
 * description: Refresh this page and you will get the state from localStorage.
 *
 * title.zh-CN: 将 state 存储在 localStorage 中
 * description.zh-CN: 刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。
 */

import React from 'react';
import { Button, Input, Space } from 'antd';
import { useLocalStorageState } from 'ahooks';

export default function () {
  const [message, setMessage] = useLocalStorageState<string | undefined>(
    'use-local-storage-state-demo1',
    {
      defaultValue: 'Hello~',
    },
  );

  return (
    <Space>
      <Input
        value={message || ''}
        placeholder="Please enter some words..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={() => setMessage('Hello~')}>Reset</Button>
      <Button onClick={() => setMessage(undefined)}>Clear</Button>
    </Space>
  );
}
