/**
 * title: Custom serialization and deserialization functions
 * desc: You may not need the default `JSON.stringify/JSON.parse` to serialize string.
 *
 * title.zh-CN: 自定义序列化和反序列化函数
 * desc.zh-CN: 对于普通的字符串，可能你不需要默认的 `JSON.stringify/JSON.parse` 来序列化。
 */

import React, { useState } from 'react';
import usePageCacheState from '..';
import { Select } from 'antd';

const UserDataDisplayer = ({ userId }: { userId: string }) => {
  const [message, setMessage] = usePageCacheState<string | undefined>(
    'use-local-storage-state-demo3',
    {
      useStorageStateOptions: {
        defaultValue: 'Hello~',
        serializer: (v) => v ?? '',
        deserializer: (v) => v,
      },
      subKey: userId,
      expire: 10,
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
};

export default function () {
  const [userId, setUserId] = useState<string>('');

  return (
    <>
      <Select
        style={{ width: 100 }}
        options={[
          {
            label: 'jack',
            value: 'jack',
          },
          {
            label: 'peter',
            value: 'peter',
          },
        ]}
        value={userId}
        onChange={setUserId}
      />
      {userId && <UserDataDisplayer userId={userId} />}
    </>
  );
}
