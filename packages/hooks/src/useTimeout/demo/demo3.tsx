/**
 * title: Imperative Usage
 * desc: Run after calling `start` function
 *
 * title.zh-CN: 主动调用
 * desc.zh-CN: 默认不启动计时器，调用start函数主动启用, 调用clear清除计时器
 */

import React, { useState } from 'react';
import { useTimeout } from 'ahooks';

export default () => {
  const [state, setState] = useState(0);

  const { start, clear, isActive } = useTimeout(
    () => {
      setState(state + 1);
    },
    2000,
    { defaultActive: false },
  );

  return (
    <div>
      <div>
        setTimeout status:{' '}
        <span style={{ color: isActive ? 'green' : 'red' }}>
          {isActive ? 'enabled' : 'disabled'}
        </span>
      </div>
      <div style={{ marginTop: '12px' }}>Count: {state}</div>
      <div style={{ marginTop: '24px' }}>
        <button onClick={start}>start</button>
        <button onClick={clear} style={{ marginLeft: '8px' }}>
          clear
        </button>
      </div>
    </div>
  );
};
