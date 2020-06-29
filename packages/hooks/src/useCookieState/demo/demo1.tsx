/**
 * title: Persist state into localStorage
 * desc: Refresh this page and you will find the value of input box get restored from localStorage.
 *
 * title.zh-CN: 将 state 持久化在 localStorage 中
 * desc.zh-CN: 刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。
 */

import React from 'react';
import useCookieState, { IOptions } from '../index';
// import { IOptions } from '../index'

export default function () {
  const options: IOptions<string> = {
    defaultValue: 'Hello',
  };
  const [message, setMessage] = useCookieState<string>('user-message', options);
  return (
    <>
      <input
        value={message || ''}
        placeholder="Please enter some words..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button style={{ margin: '0 16px' }} type="button" onClick={() => setMessage('Hello~')}>
        Set Hello
      </button>
      <button type="button" onClick={() => setMessage()}>
        clear
      </button>
    </>
  );
}
