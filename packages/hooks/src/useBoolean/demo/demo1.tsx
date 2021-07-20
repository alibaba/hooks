/**
 * title: Default usage
 * desc: Toggle Boolean, can set default value.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 切换 Boolean，可以接收一个参数作为默认值。
 */

import React from 'react';
import { useBoolean } from 'ahooks';

export default () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(true);

  return (
    <div>
      <p>Effects：{JSON.stringify(state)}</p>
      <p>
        <button type="button" onClick={toggle}>
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
