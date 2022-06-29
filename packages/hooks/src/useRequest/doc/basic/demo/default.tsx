/**
 * title: Read username
 *
 * title.zh-CN: 读取用户名称
 */

import { useRequest } from 'ahooks';
import Mock from 'mockjs';
import React from 'react';

function getUsername(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(Mock.mock('@name'));
      } else {
        reject(new Error('Failed to get username'));
      }
    }, 1000);
  });
}

export default () => {
  const { data, error, loading } = useRequest(getUsername);

  if (error) {
    return <div>{error.message}</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  return <div>Username: {data}</div>;
};
