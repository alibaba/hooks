/**
 * title: Distinguish cached data by user ID
 * desc: Use the user ID as a subKey, so that different users will only use their cached data.
 *
 * title.zh-CN: 以用户id区分缓存数据
 * desc.zh-CN: 将用户id作为`subKey`，这样不同的用户只会使用各自缓存的数据。
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
