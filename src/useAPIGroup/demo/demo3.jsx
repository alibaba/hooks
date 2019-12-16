import { Button, Spin } from 'antd';
import React from 'react';
import useAPI from '..';

function getNumber() {
  console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
  return fetch('https://helloacm.com/api/random/?n=8&x=4').then(res => res.json());
}

export default () => {
  const { data, loading, run, stopPolling } = useAPI(getNumber, {
    pollingInterval: 1000,
    pollingWhenHidden: false,
  });
  return (
    <>
      <Spin spinning={loading}>Number: {data}</Spin>
      <Button.Group
        style={{
          marginTop: 16,
        }}
      >
        <Button onClick={run}>start</Button>
        <Button onClick={stopPolling}>stop</Button>
      </Button.Group>
    </>
  );
};
