/**
 * title: Use axios
 * desc: By setting `requstMethod`, you can use your own request library.
 *
 * title.zh-CN: 使用 axios
 * desc.zh-CN: 通过设置 `requstMethod`, 可以使用自己的请求库。
 */

import { useRequest } from 'ahooks';
import React from 'react';
import axios from 'axios';

export default () => {
  const { data, error, loading } = useRequest('https://helloacm.com/api/random/?n=8&x=4', {
    requestMethod: (param: any) => axios(param),
  });
  if (error) {
    return <div>failed to load</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  return <div>Number: {data?.data}</div>;
};
