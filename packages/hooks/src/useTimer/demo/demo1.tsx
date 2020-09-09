/**
 * title: Default usage
 * desc: Simple timer management example.
 *
 * title.zh-CN: 基础使用
 * desc.zh-CN: 简单的计时器管理示例。
 */

import React from 'react';
import { useTimer } from 'ahooks';

export default () => {
  const [current, actions] = useTimer();
  const [current2, actions2] = useTimer({ updateRate: 100 });

  return (
    <div>
      <h3>updateRate: 1000</h3>
      <p>current: {current}</p>
      <button onClick={() => actions.start(10000)}>start(10000)</button>
      <button style={{ marginLeft: 8 }} onClick={actions.pause}>
        pause()
      </button>
      <button style={{ marginLeft: 8 }} onClick={actions.cont}>
        cont()
      </button>
      <button style={{ marginLeft: 8 }} onClick={actions.reset}>
        reset()
      </button>
      <h3 style={{ marginTop: 16 }}>updateRate: 100</h3>
      <p>current: {current2}</p>
      <button onClick={() => actions2.start(10000)}>start(10000)</button>
      <button style={{ marginLeft: 8 }} onClick={actions2.pause}>
        pause()
      </button>
      <button style={{ marginLeft: 8 }} onClick={actions2.cont}>
        cont()
      </button>
      <button style={{ marginLeft: 8 }} onClick={actions2.reset}>
        reset()
      </button>
    </div>
  );
};
