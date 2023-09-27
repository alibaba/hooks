import React, { useState } from 'react';
import Mock from 'mockjs';
import { useRequest } from 'ahooks';

function getUsername(id: number): Promise<string> {
  console.log('use-request-refresh-deps-id', id);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const [userId, setUserId] = useState<number>();
  const { data, loading, run } = useRequest((id: number) => getUsername(id), {
    refreshDeps: [userId],
    refreshDepsAction: () => run(userId),
  });

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <p>Username: {data}</p>
      <button style={{ marginRight: '8px' }} onClick={() => setUserId(Math.random())}>
        Use latest id to refresh
      </button>
      <button onClick={() => run(Math.random())}>Use latest id to refresh</button>
    </div>
  );
};
