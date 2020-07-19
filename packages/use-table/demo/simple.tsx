/**
 * title: Use axios
 * desc: By setting `requstMethod`, you can use your own request library.
 *
 * title.zh-CN: 使用 axios
 * desc.zh-CN: 通过设置 `requstMethod`, 可以使用自己的请求库。
 */

import React from 'react';
import useTable from '../src/index';

const query = () => {
  return new Promise((resolve) => {
    resolve([]);
  });
};

export default () => {
  const { tableProps } = useTable(query);
  console.log(tableProps);

  return <div>Hello world</div>;
};
