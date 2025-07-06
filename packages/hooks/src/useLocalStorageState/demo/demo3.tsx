/**
 * title: Custom serialization and deserialization functions
 * desc: You may not need the default `JSON.stringify/JSON.parse` to serialize string.
 *
 * title.zh-CN: 自定义序列化和反序列化函数
 * desc.zh-CN: 对于普通的字符串，可能你不需要默认的 `JSON.stringify/JSON.parse` 来序列化。
 */

import React from 'react';
import { useLocalStorageState } from 'ahooks';

export default function () {
  const [message, setMessage] = useLocalStorageState<string | undefined>(
    'use-local-storage-state-demo3',
    {
      defaultValue: 'Hello~',
      serializer: (v) => v ?? '',
      deserializer: (v) => v,
    },
  );

  return (
    <>
      <input
        value={message || ''}
        placeholder="Please enter some words..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button style={{ margin: '0 8px' }} type="button" onClick={() => setMessage('Hello~')}>
        Reset
      </button>
      <button type="button" onClick={() => setMessage(undefined)}>
        Clear
      </button>
    </>
  );
}
