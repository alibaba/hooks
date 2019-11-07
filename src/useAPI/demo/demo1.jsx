import { Spin } from 'antd';
import React from 'react';
import useAPI from '..';

export default () => {
  const { data, loading } = useAPI({
    url: 'https://helloacm.com/api/random/?n=8&x=4',
  });
  return (
    <Spin spinning={loading}>
      <div>ID: {data}</div>
    </Spin>
  );
};
