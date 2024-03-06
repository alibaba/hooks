/**
 * title: Advanced usage
 * description: Modify the delay to realize the timer interval change and pause.
 *
 * title.zh-CN: 进阶使用
 * description.zh-CN: 动态修改 delay 以实现定时器间隔变化与暂停。
 */

import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useRafInterval } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);
  const [interval, setInterval] = useState(1000);

  const clear = useRafInterval(() => {
    setCount(count + 1);
  }, interval);

  return (
    <>
      <Space style={{ marginBottom: 8 }} wrap>
        <Button onClick={() => setInterval((t) => (!!t ? t + 1000 : 1000))}>Interval + 1000</Button>
        <Button onClick={() => setInterval(1000)}>Reset interval</Button>
        <Button onClick={() => clear()}>Clear</Button>
      </Space>
      <p>count: {count} </p>
      <p>interval: {interval} </p>
    </>
  );
};
