/**
 * title: Default usage
 * desc: usePersistFn is the same as useCallback.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: usePersistFn 与 useCallback 可以实现同样的效果。
 */

import React, { useState, useCallback, useRef } from 'react';
import { message } from 'antd';
import { usePersistFn } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);

  const callbackFn = useCallback(() => {
    message.info(`Current count is ${count}`);
  }, [count]);

  const persistFn = usePersistFn(() => {
    message.info(`Current count is ${count}`);
  });

  return (
    <>
      <p>count: {count}</p>
      <button
        type="button"
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Add Count
      </button>
      <div style={{ marginTop: 16 }}>
        <button type="button" onClick={callbackFn}>
          call callbackFn
        </button>
        <button type="button" onClick={persistFn} style={{ marginLeft: 8 }}>
          call persistFn
        </button>
      </div>
    </>
  );
};
