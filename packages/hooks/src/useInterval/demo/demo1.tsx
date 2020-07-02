/**
 * title: Default usage
 * desc:
 *
 * title.zh-CN: 基础使用
 * desc.zh-CN:
 */

import React, { useState } from 'react';
import { useInterval } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);
  const [immediateCount, setImmediateCount] = useState(0);
  const [interval, setInterval] = useState(3000);

  useInterval(
    () => {
      log();
    },
    interval,
    { immediate: false },
  );

  useInterval(
    () => {
      immediateLog();
    },
    interval,
    { immediate: true },
  );

  function log() {
    setCount(count + 1);
  }
  function immediateLog() {
    setImmediateCount(immediateCount + 1);
  }
  return (
    <div>
      <p style={{ marginTop: 16 }}>immediate: false count: {count} </p>
      <p style={{ marginTop: 16 }}>immediate: true count: {immediateCount} </p>
      <p style={{ marginTop: 16 }}> interval: {interval} </p>
      <button onClick={() => setInterval(interval + 1000)} style={{ marginRight: 12 }}>
        interval + 1000
      </button>
      <button
        style={{ marginRight: 12 }}
        onClick={() => {
          setInterval(3000);
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
