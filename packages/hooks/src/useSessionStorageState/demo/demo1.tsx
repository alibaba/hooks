/**
 * title: Persist state into sessionStorage
 * desc: Refresh this page and you will find the value of input box get restored from sessionStorage.
 *
 * title.zh-CN: 将 state 持久化在 sessionStorage 中
 * desc.zh-CN: 刷新页面后，可以看到输入框中的内容被从 sessionStorage 中恢复了。
 */

import { useSessionStorageState } from 'ahooks';
import React from 'react';

export default function () {
  const [message, setMessage] = useSessionStorageState('user-message', 'Hello~');
  return (
    <>
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="Please enter some words..."
        style={{ width: 200, marginRight: 8 }}
      />
      <button
        type="button"
        onClick={() => {
          setMessage();
        }}
      >
        Reset
      </button>
    </>
  );
}
