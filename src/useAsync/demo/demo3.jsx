import { Button, Spin } from 'antd';
import React from 'react';
import useAsync from '..';

function getNumber() {
  return fetch('https://helloacm.com/api/random/?n=8&x=4').then(res => res.json());
}

export default () => {
  const { data, loading, timer, run } = useAsync(() => getNumber(), [], {
    manual: true,
    pollingInterval: 3000,
  });
  return (
    <>
      <Spin spinning={loading}>Number: {data}</Spin>
      <Button.Group
        style={{
          marginTop: 16,
        }}
      >
        <Button onClick={run}>start polling</Button>
        <Button onClick={timer.pause}>pause</Button>
        <Button onClick={timer.stop}>stop</Button>
        <Button onClick={timer.resume}>resume</Button>
      </Button.Group>
    </>
  );
};
