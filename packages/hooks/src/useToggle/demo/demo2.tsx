/**
 * title: Advanced usage
 * desc: Accept two parameters, switch between them.
 *
 * title.zh-CN: 进阶使用
 * desc.zh-CN: 接受两个参数，在参数间进行切换。
 */

import React from 'react';
import { useToggle } from 'ahooks';

export default () => {
  const [ state, { toggle, setLeft, setRight } ] = useToggle('Hello', 'World');

  return (
    <div>
      <p>Effects：{state}</p>
      <p>
        <button type="default" onClick={() => toggle()}>
          Toggle
        </button>
        <button type="danger" onClick={() => toggle('Hello')} style={{ margin: '0 16px' }}>
          Toggle Hello
        </button>
        <button type="primary" onClick={() => toggle('World')}>
          Toggle World
        </button>
        <button type="danger" onClick={setLeft} style={{ margin: '0 16px' }}>
          Set Hello
        </button>
        <button type="primary" onClick={setRight}>
          Set World
        </button>
      </p>
    </div>
  );
};
