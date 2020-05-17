/**
 * title: Use default fetch
 * desc: If the first parameter of useRequest is a string or object, the network request will be sent by fetch.
 *
 * title.zh-CN: 使用默认的 fetch
 * desc.zh-CN: 如果 useRequest 第一个参数是字符串或 object，则默认使用 fetch 发送网络请求
 */

import { useRequest } from 'ahooks';
import React from 'react';

export default () => {
  const { data, error, loading } = useRequest({
    url: 'https://helloacm.com/api/random/?n=8&x=4',
    method: 'get'
  })

  if (error) {
    return <div>failed to load</div>
  }
  if (loading) {
    return <div>loading...</div>
  }
  return <div>Number: {data}</div>
}
