/**
 * title: Open console to view logs
 * desc: The counter prints the value every 3 seconds
 *
 * title.zh-CN: 打开控制台查看输出
 * desc.zh-CN: 计数器每 3 秒打印一次值
 */

import React, { useEffect } from 'react';
import { useGetState } from 'ahooks';

export default () => {
  const [count, setCount, getCount] = useGetState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval count', getCount());
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <button onClick={() => setCount((count) => count + 1)}>count: {count}</button>;
};
