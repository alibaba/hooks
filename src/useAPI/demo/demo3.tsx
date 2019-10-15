import React, { useMemo } from 'react';
import { Spin, Button } from 'antd';
import useAPI from '..';

export default () => {
  const { data, loading, timer } = useAPI({
    url: 'https://randomuser.me/api',
    pollingInterval: 3000,
  });
  const email = useMemo(() => (((data || {}).results || [])[0] || {}).email, [data]);

  return (
    <>
      <Spin spinning={loading}>email: {email}</Spin>
      <Button.Group style={{ marginTop: 16 }}>
        <Button onClick={timer.pause}>pause</Button>
        <Button onClick={timer.stop}>stop</Button>
        <Button onClick={timer.resume}>resume</Button>
      </Button.Group>
    </>
  );
};
