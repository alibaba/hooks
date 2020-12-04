/**
 * title: Default usage
 * desc:  Every promise resolve then 1000ms, execute once
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 每次 promise 执行成功后等待 1000ms，执行一次
 */

import React, { useState } from 'react';
import { Button } from 'antd';
import { useIteration } from 'ahooks';

export default () => {
  const delay = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };
  const [count, setCount] = useState(0);

  const { start, stop } = useIteration(async () => {
    await delay(1000);
    setCount(count + 1);
  });

  return (
    <div>
      <p>count: {count}</p>
      <Button
        onClick={() => {
          start(1000);
        }}
      >
        start
      </Button>
      <Button onClick={stop}>stop</Button>
    </div>
  );
};
