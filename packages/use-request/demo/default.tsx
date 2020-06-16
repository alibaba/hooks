/**
 * title: Default Request
 * desc: In this example, useRequest receives an asynchronous function `getUsername`, which is automatically triggered when the component mounted. At the same time, useRequest will automatically manage the status of `loading`, `data`, and `error` of asynchronous requests.
 *
 * title.zh-CN: 默认请求
 * desc.zh-CN: 在这个例子中， useRequest 接收了一个异步函数 `getUsername` ，在组件初次加载时， 自动触发该函数执行。同时 useRequest 会自动管理异步请求的 `loading` , `data` , `error` 等状态。
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
