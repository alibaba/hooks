/**
 * title: Use default umi-request
 * desc: If the first parameter of useRequest is a string, the network request is sent by umi-request by default.
 *
 * title.zh-CN: 使用默认的 umi-request
 * desc.zh-CN: 如果 useRequest 第一个参数是字符串，则默认使用 umi-request 发送网络请求
 */

import { useRequest } from '@umijs/hooks';
import React from 'react';

export default () => {
  const { data, error, loading } = useRequest('https://helloacm.com/api/random/?n=8&x=4')

  if (error) {
    return <div>failed to load</div>
  }
  if (loading) {
    return <div>loading...</div>
  }
  return <div>Number: {data}</div>
}
