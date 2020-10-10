/**
 * title: Default usage
 * desc: Default as a switch function, or accept a parameter to change state.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 默认切换布尔值状态，也可以接收一个参数作为新的值。
 */

import React from 'react';
import { useBoolean } from 'ahooks';

export default () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(true);

  return (
    <div>
      <p>Effects：{JSON.stringify(state)}</p>
      <p>
        <button type="button" onClick={() => toggle()}>
          Toggle
        </button>
        <button type="button" onClick={setFalse} style={{ margin: '0 16px' }}>
          Set false
        </button>
        <button type="button" onClick={setTrue}>
          Set true
        </button>
      </p>
    </div>
  );
};
