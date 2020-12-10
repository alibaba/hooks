/**
 * title: Default usage
 * desc: Every 1000ms, execute once
 *
 * title.zh-CN: 迭代模式
 * desc.zh-CN: 异步函数执行完成后，再开始下一轮操作
 */

import React, { useState } from 'react';
import { useInterval } from 'ahooks';

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export default () => {
  const [intervalCount, setIntervalCount] = useState(0);
  const [calledCount, setCalledCount] = useState(0);

  useInterval(
    async () => {
      setIntervalCount(intervalCount + 1);
      await wait(2000);
      setCalledCount(calledCount + 1);
    },
    1000,
    { iterate: true },
  );

  return (
    <div>
      <div>interval count: {intervalCount}</div>
      <div>called count: {calledCount}</div>
    </div>
  );
};
