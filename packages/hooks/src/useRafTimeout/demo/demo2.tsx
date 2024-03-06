/**
 * title: Advanced usage
 * description: Modify the delay to realize the timer timeout change and pause.
 *
 * title.zh-CN: 进阶使用
 * description.zh-CN: 动态修改 delay 以实现定时器间隔变化与暂停。
 */

import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useRafTimeout } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState<number | undefined>(1000);

  const clear = useRafTimeout(() => {
    setCount(count + 1);
  }, delay);

  return (
    <div>
      <p>count: {count} </p>
      <p>delay: {delay} </p>
      <Space style={{ marginTop: 8 }} wrap>
        <Button onClick={() => setDelay((t) => (!!t ? t + 1000 : 1000))}>Delay + 1000</Button>
        <Button onClick={() => setDelay(1000)}>Reset Delay</Button>
        <Button onClick={() => clear()}>Clear</Button>
      </Space>
    </div>
  );
};
