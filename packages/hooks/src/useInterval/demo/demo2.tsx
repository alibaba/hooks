/**
 * title: Advanced usage
 * desc: Immediate interval reset、delay increase、clear
 *
 * title.zh-CN: 进阶使用
 * desc.zh-CN: 立即执行定时器的重启、间隔时间增加、清除的使用。
 */

import React, { useState } from 'react';
import { useInterval } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);
  const [interval, setInterval] = useState(1000);

  useInterval(
    () => {
      setCount(count + 1);
    },
    interval,
    { immediate: true },
  );

  return (
    <div>
      <p> count: {count} </p>
      <p style={{ marginTop: 16 }}> interval: {interval} </p>
      <button onClick={() => setInterval(interval + 1000)} style={{ marginRight: 8 }}>
        interval + 1000
      </button>
      <button
        style={{ marginRight: 8 }}
        onClick={() => {
          setInterval(1000);
        }}
      >
        reset interval
      </button>
      <button
        onClick={() => {
          setInterval(null);
        }}
      >
        clear
      </button>
    </div>
  );
};
