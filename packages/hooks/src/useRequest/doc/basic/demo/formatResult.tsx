import useRequest from 'ahooks';
import Mock from 'mockjs';
import React from 'react';

function getUsername(): Promise<{ username: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: Mock.mock('@name'),
      });
    }, 1000);
  });
}

export default () => {
  const { data, loading } = useRequest(getUsername, {
    formatResult: (res) => res.username,
  });

  if (loading) {
    return <div>loading...</div>;
  }
  return <div>Username: {data}</div>;
};
