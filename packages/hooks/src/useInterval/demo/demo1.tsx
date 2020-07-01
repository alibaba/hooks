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
  const [count, setCount] = useState(1);
  const [immediate, setImmediate] = useState(false);
  const [interval, setInterval] = useState(1000);

  useInterval(
    () => {
      log();
    },
    interval,
    { immediate: immediate },
  );

  function log() {
    setCount(count + 1);
    console.log('count', count, 'immediate', immediate, 'interval:', interval);
  }

  return (
    <div>
      <p style={{ marginTop: 16 }}> count: {count} </p>
      <p style={{ marginTop: 16 }}> interval: {interval} </p>
      <button
        type="button"
        onClick={() => {
          setImmediate(!immediate);
        }}
      >
        Click change immediate!
      </button>
      <button type="button" onClick={() => setInterval(interval * 2)}>
        Click change interval!
      </button>
    </div>
  );
};
