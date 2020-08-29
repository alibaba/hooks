/**
 * title: Manual Control
 * desc: controll interval status manually
 *
 * title.zh-CN: 手动控制
 * desc.zh-CN: 手动控制定时器状态
 */

import React, { useState, Dispatch, SetStateAction } from 'react';
import { useInterval } from 'ahooks';

const useManualInterval = (
  fn: any,
  interval: number | null | undefined,
  options?: { immediate?: boolean },
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [enable, setEnable] = useState<boolean>(true);
  useInterval(fn, enable ? interval : null, options);
  return [enable, setEnable];
};

export default () => {
  const [count, setCount] = useState<number>(0);
  const [interval, setInterval] = useState<number>(500);

  const [status, setStatus] = useManualInterval(
    () => {
      setCount(count + 1);
    },
    interval,
    { immediate: true },
  );

  return (
    <>
      <p style={{ marginTop: 16 }}> count: {count} </p>
      <p style={{ marginTop: 16 }}> interval: {interval} </p>
      <p style={{ marginTop: 16 }}> status: {status ? 'alive' : 'stopped'} </p>
      <button onClick={() => setInterval(interval + 500)} style={{ marginRight: 12 }}>
        interval + 500
      </button>
      <button
        style={{ marginRight: 12 }}
        onClick={() => {
          setInterval(500);
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
    </>
  );
};
