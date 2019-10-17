import React, { useMemo } from 'react';
import { Spin, Button } from 'antd';
import useAsync from '..';

function getEmail() {
  return fetch('https://randomuser.me/api').then(res => res.json());
}

export default () => {
  const { data, loading, timer, run } = useAsync(() => getEmail(), [], {
    manual: true,
    pollingInterval: 3000,
  });
  const email = useMemo(() => (((data || {}).results || [])[0] || {}).email, [data]);
  return (
    <>
      <Spin spinning={loading}>email: {email}</Spin>
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
