import React from 'react';
import Mock from 'mockjs';
import { useRequest } from 'ahooks';

function getUsername() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const { data, loading } = useRequest(getUsername, {
    refreshOnWindowFocus: true,
  });

  return <div>Username: {loading ? 'Loading' : data}</div>;
};
