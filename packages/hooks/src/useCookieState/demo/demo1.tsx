/**
 * title: Store state into Cookie
 * desc: Refresh this page and you will get the state from Cookie.
 *
 * title.zh-CN: 将 state 存储在 Cookie 中
 * desc.zh-CN: 刷新页面后，可以看到输入框中的内容被从 Cookie 中恢复了。
 */

import React from 'react';
import { useCookieState } from 'ahooks';

export default () => {
  const [message, setMessage] = useCookieState('useCookieStateString');
  return (
    <input
      value={message}
      placeholder="Please enter some words..."
      onChange={(e) => setMessage(e.target.value)}
      style={{ width: 300 }}
    />
  );
};
