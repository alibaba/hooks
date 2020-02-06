/**
 * title: Persist state into localStorage
 * desc: Refresh this page and you will find the value of input box get restored from localStorage.
 * 
 * title.zh-CN: 将 state 持久化在 localStorage 中
 * desc.zh-CN: 刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。
 */

import React from 'react';
import { Input, Button } from 'antd';
import { useLocalStorageState } from '@umijs/hooks';

export default function () {
  const [message, setMessage] = useLocalStorageState('user-message', 'Hello~');
  return (
    <>
      <Input
        value={message}
        onChange={e => {
          setMessage(e.target.value);
        }}
        placeholder="Please enter some words..."
        style={{ width: 200, marginRight: 16 }}
      />
      <Button
        onClick={() => {
          setMessage();
        }}
      >
        Reset
      </Button>
    </>
  );
}
