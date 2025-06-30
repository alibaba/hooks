import React from 'react';
import Mock from 'mockjs';
import { Button, Space } from 'antd';
import { useRequest } from 'ahooks';

function getUsername() {
  console.log('polling getUsername');
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const { data, loading, run, cancel } = useRequest(getUsername, {
    pollingInterval: 1000,
    pollingWhenHidden: false,
  });

  return (
    <>
      <p>Username: {loading ? 'Loading' : data}</p>
      <Space style={{ marginTop: 8 }}>
        <Button onClick={run}>start</Button>
        <Button onClick={cancel}>stop</Button>
      </Space>
    </>
  );
};
