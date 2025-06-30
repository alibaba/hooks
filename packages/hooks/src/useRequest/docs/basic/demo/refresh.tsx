/**
 * title: Refresh username
 *
 * title.zh-CN: 刷新用户名称
 */

import React, { useEffect } from 'react';
import Mock from 'mockjs';
import { Button } from 'antd';
import { useRequest } from 'ahooks';

function getUsername(id: number): Promise<string> {
  console.log('use-request-refresh-id', id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const { data, loading, run, refresh } = useRequest((id: number) => getUsername(id), {
    manual: true,
  });

  useEffect(() => {
    run(1);
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <p style={{ marginBottom: 8 }}>Username: {data}</p>
      <Button onClick={refresh}>Refresh</Button>
    </div>
  );
};
