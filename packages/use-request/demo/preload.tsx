/**
 * title: Preload
 * desc: Requests for the same `cacheKey` are shared globally, which means that you can load data in advance. With this feature, preloading can be easily implemented..
 *
 * title.zh-CN: 预加载
 * desc.zh-CN: 同一个 `cacheKey` 的请求，是全局共享的，也就是你可以提前加载数据。利用该特性，可以很方便的实现预加载。
 */

import { useBoolean, useRequest } from '@umijs/hooks';
import { Button, Spin } from 'antd';
import React from 'react';
import Mock from 'mockjs';

async function getArticle(type?: string): Promise<{ data: string, time: number }> {
  console.log(type);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: new Date().getTime()
      })
    }, 1000)
  });
}

export default () => {
  const { state, toggle } = useBoolean();
  const { run } = useRequest(getArticle, {
    cacheKey: 'article',
    manual: true
  });
  return (
    <div>
      <p>When the mouse hovers over the button, the article data is preloaded.</p>
      <p>
        <Button onMouseEnter={() => run()} onClick={() => toggle()}>show/hidden</Button>
      </p>
      {state && <Article />}
    </div>
  )
};

const Article = () => {
  const { data, loading } = useRequest(getArticle, {
    cacheKey: 'article'
  });
  return (
    <Spin spinning={!data && loading}>
      <p>Latest request time: {data?.time}</p>
      <p>{data?.data}</p>
    </Spin>
  );
}
