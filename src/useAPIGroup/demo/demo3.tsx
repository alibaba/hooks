import { Button, Spin } from 'antd';
import React from 'react';
import useAPI from '..';

function getNumber(): Promise<number> {
  return fetch('https://helloacm.com/api/random/?n=8&x=4').then(res => res.json());
}

export default () => {
  const { data, loading, run, cancel } = useAPI(getNumber, {
    manual: true,
    pollingInterval: 1000,
  });

  return (
    <>
      <Spin spinning={loading}>Number: {data}</Spin>
      <Button.Group style={{ marginTop: 16 }}>
        <Button onClick={run}>start polling</Button>
        <Button onClick={cancel}>stop</Button>
      </Button.Group>
    </>
  );
};
