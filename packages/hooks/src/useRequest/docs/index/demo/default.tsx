/**
 * title: Read username
 *
 * title.zh-CN: 读取用户名称
 */

import { useRequest } from 'ahooks';
import Mock from 'mockjs';
import React from 'react';

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const { data, error, loading } = useRequest(getUsername);

  if (error) {
    return <div>failed to load</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  return <div>Username: {data}</div>;
};
