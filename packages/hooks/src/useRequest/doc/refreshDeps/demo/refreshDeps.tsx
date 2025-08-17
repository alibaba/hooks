/**
 * title: Repeat last request
 * desc: When the dependency array changes, use the previous parameters to make the request again.
 *
 * title.zh-CN: 重复上一次请求
 * desc.zh-CN: 依赖数组变化时，使用上一次的参数重新发起请求。
 */

import React, { useState } from 'react';
import Mock from 'mockjs';
import { Space, Button } from 'antd';
import { useRequest } from 'ahooks';

function getUsername(id: number): Promise<string> {
  console.log('getUsername id:', id);

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
  });

  return (
    <Space direction="vertical">
      <p>Username: {loading ? 'loading...' : data}</p>
      <Button onClick={() => setUserId(Math.random())}>Use previous id to refresh</Button>
      <Button onClick={() => run(Math.random())}>Use latest id to refresh</Button>
    </Space>
  );
};
