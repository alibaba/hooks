/**
 * title: Default usage
 * desc: Default as a switch function,or accept a parameter to change state
 * 
 * title.zh-CN: 默认用法
 * desc.zh-CN: 默认切换布尔值状态，也可以接收一个参数作为新的值
 */

import React from 'react';
import useSet from '../index';

export default () => {
  const [set, { add, has, remove, reset }] = useSet('hello');

  return (
    <div>
      <button onClick={() => add(String(Date.now()))}>Add</button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => remove('hello')} disabled={!has('hello')}>
        Remove 'hello'
      </button>
      <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
    </div>
  );
};
