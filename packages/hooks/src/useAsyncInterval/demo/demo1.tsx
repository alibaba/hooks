/**
 * title: Default usage
 * desc: every times first wait for async function finish, then wait 1000ms, execute once
 *
 * title.zh-CN: 普通用法
 * desc.zh-CN: 异步函数执行完成后，再开始下一轮操作
 */

import React, { useState } from 'react';
import { useAsyncInterval } from 'ahooks';

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, time);
  });
};

export default () => {
  const [intervalCount, setIntervalCount] = useState(0);
  const [calledCount, setCalledCount] = useState(0);

  useAsyncInterval(
    async () => {
      setIntervalCount(intervalCount + 1);
      await wait(2000);
      setCalledCount(calledCount + 1);
    },
    1000,
    { immediate: true },
  );

  return (
    <div>
      <div>interval count: {intervalCount}</div>
      <div>called count: {calledCount}</div>
    </div>
  );
};
