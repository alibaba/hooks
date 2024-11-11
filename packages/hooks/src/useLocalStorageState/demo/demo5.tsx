/**
 * title: localStorage expiration time
 * desc: Data will be cleared after expiration time
 *
 * title.zh-CN: localStorage 过期时间
 * desc.zh-CN: 数据将在过期时间后自动清除
 */

import React from 'react';
import { useLocalStorageState } from 'ahooks';

export default function () {
  const [message, setMessage] = useLocalStorageState('use-local-storage-state-demo5', {
    defaultValue: 'Hello~',
    expirationTime: 5000,
  });

  return (
    <div>
      <p>{message}</p>
      <button
        style={{ margin: '0 8px' }}
        onClick={() => {
          setMessage('Hello~' + new Date().toLocaleTimeString());
        }}
      >
        Update Message
      </button>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
}
