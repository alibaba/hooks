import { Button, Spin } from 'antd';
import React from 'react';
import useAsync from '..';

function getNumber() {
  return fetch('https://helloacm.com/api/random/?n=8&x=4').then(res => res.json());
}

export default () => {
  const { data, loading, run } = useAsync(() => getNumber(), { manual: true });

  return (
    <>
      <Spin spinning={loading}>Number: {data}</Spin>
      <Button onClick={run} style={{ marginTop: 16 }}>
        fetch
      </Button>
    </>
  );
};
