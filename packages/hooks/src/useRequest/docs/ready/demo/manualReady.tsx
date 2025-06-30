import React from 'react';
import Mock from 'mockjs';
import { Button, Space } from 'antd';
import { useRequest, useToggle } from 'ahooks';

function getUsername() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const [ready, { toggle }] = useToggle(false);
  const { data, loading, run } = useRequest(getUsername, {
    ready,
    manual: true,
  });

  return (
    <div>
      <Space style={{ display: 'flex', marginBottom: 8 }}>
        Username: {loading ? 'Loading' : data}
        <Button onClick={run}>run</Button>
      </Space>
      <Space>
        Ready: {JSON.stringify(ready)}
        <Button onClick={toggle}>Toggle Ready</Button>
      </Space>
    </div>
  );
};
