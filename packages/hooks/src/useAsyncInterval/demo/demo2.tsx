/**
 * title: Advance usage
 * desc: every times first wait for async function finish, then wait 1000ms, execute once
 *
 * title.zh-CN: 进阶模式
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
  const [delay, setDelay] = useState(1000);
  const [status, setStatus] = useState(true);

  useAsyncInterval(
    async () => {
      setIntervalCount(intervalCount + 1);
      await wait(2000);
      setCalledCount(calledCount + 1);
    },
    status ? delay : null,
    { immediate: false },
  );

  return (
    <div>
      <div>interval count: {intervalCount}</div>
      <div>called count: {calledCount}</div>
      <button onClick={() => setDelay(delay + 500)} style={{ marginRight: 12 }}>
        interval + 500
      </button>
      <button
        style={{ marginRight: 12 }}
        onClick={() => {
          setDelay(1000);
        }}
      >
        reset interval
      </button>
      <button
        onClick={() => {
          setStatus(!status);
        }}
      >
        {status ? 'stop' : 'start'} interval
      </button>
    </div>
  );
};
