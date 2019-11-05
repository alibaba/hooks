import { Button, Spin } from 'antd';
import React from 'react';
import useAPI from '..';

export default () => {
  const { data, loading, timer } = useAPI({
    url: 'https://helloacm.com/api/random/?n=8&x=4',
    pollingInterval: 3000,
  });

  return (
    <>
      <Spin spinning={loading}>ID: {data}</Spin>
      <Button.Group style={{ marginTop: 16 }}>
        <Button onClick={timer.pause}>pause</Button>
        <Button onClick={timer.stop}>stop</Button>
        <Button onClick={timer.resume}>resume</Button>
      </Button.Group>
    </>
  );
};
