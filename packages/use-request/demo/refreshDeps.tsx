/**
 * title: refreshDeps
 * desc: When `options.refreshDeps` changes, useRequest will execute the service with previous params.
 *
 * title.zh-CN: refreshDeps
 * desc.zh-CN: 当 `options.refreshDeps` 变化时，useRequest 会使用之前的参数重新执行 service。
 */

import { useRequest } from 'ahooks';
import React, { useState } from 'react';

const userSchool = (id: string) => {
  switch (id) {
    case '1':
      return 'Tsinghua University';
    case '2':
      return 'Beijing University';
    case '3':
      return 'Zhejiang University';
    default:
      return '';
  }
};

async function getUserSchool(userId: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userSchool(userId));
    }, 1000);
  });
}

export default () => {
  const [userId, setUserId] = useState('1');
  const { data, loading } = useRequest(() => getUserSchool(userId), {
    refreshDeps: [userId],
  });

  return (
    <div>
      <select
        onChange={(e) => setUserId(e.target.value)}
        value={userId}
        style={{ marginBottom: 16, width: 120 }}
      >
        <option value="1">user 1</option>
        <option value="2">user 2</option>
        <option value="3">user 3</option>
      </select>
      <p>School: {loading ? 'loading' : data}</p>
    </div>
  );
};
