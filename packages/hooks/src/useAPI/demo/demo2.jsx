import { Button, Spin } from 'antd';
import React from 'react';
import useAPI from '..';

export default () => {
  const { data, loading, run } = useAPI({
    url: 'https://helloacm.com/api/random/?n=8&x=4',
    manual: true,
  });
  return (
    <>
      <Spin spinning={loading}>ID: {data}</Spin>
      <Button
        onClick={run}
        style={{
          marginTop: 16,
        }}
      >
        fetch
      </Button>
    </>
  );
};
