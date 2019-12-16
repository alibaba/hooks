import { Spin } from 'antd';
import React from 'react';
import useAPI from '..';

function getNumber(): Promise<string> {
  return fetch('https://helloacm.com/api/random/?n=8&x=4').then(res => res.json());
}

export default () => {
  const { data, loading } = useAPI(getNumber, {
    refreshOnWindowFocus: true
  });

  return (
    <Spin spinning={loading}>Number: {data}</Spin>
  );
};
