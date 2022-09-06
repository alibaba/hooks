/**
 * title: Basic usage
 * desc: Utilize Suspense's suspend ability to make data requests
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 利用Suspense的挂起能力做数据请求
 */

import React, { Suspense } from 'react';
import { createResource, useResource } from 'ahooks';

const resource = createResource(
  (text: string) =>
    new Promise<string>((resolve) =>
      setTimeout(() => {
        resolve(text);
      }, 500),
    ),
);

const Child = () => {
  const txt = useResource(resource, 'Hello World');

  return <div>{txt}</div>;
};

export default () => {
  return (
    <>
      <h3>useResource</h3>
      <Suspense fallback={<span>loading...</span>}>
        <Child />
      </Suspense>
    </>
  );
};
