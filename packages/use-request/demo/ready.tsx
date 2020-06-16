/**
 * title: Dependent Request
 * desc: Only when `options.ready` becomes true, will the request be initiated. Based on this feature, dependent requests can be implemented.
 *
 * title.zh-CN: 依赖请求
 * desc.zh-CN: 只有当 `options.ready` 变为 true 时, 才会发起请求，基于该特性可以实现串行请求，依赖请求等。
 */

import { useRequest } from 'ahooks';
import Mock from 'mockjs';
import React from 'react';

function getUserId(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1011);
    }, 1000);
  });
}

function getUsername(id: number): Promise<string> {
  console.log('user id:', id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const userIdRequest = useRequest(getUserId);

  const usernameRequest = useRequest(() => getUsername(userIdRequest.data), {
    ready: !!userIdRequest.data,
  });

  return (
    <div>
      <p>UserId: {userIdRequest.loading ? 'loading' : userIdRequest.data}</p>
      <p>Username: {usernameRequest.loading ? 'loading' : usernameRequest.data}</p>
    </div>
  );
};
