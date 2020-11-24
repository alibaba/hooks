/**
 * title: Switch between any two values
 * desc: Accept two parameters, switch between them.
 *
 * title.zh-CN: 在任意两个值之间切换
 * desc.zh-CN: 接受两个参数，在参数间进行切换。
 */

import React from 'react';
import { useToggle } from 'ahooks';

export default () => {
  const [state, { toggle, setLeft, setRight }] = useToggle('Hello', 'World');

  return (
    <div>
      <p>Effects：{state}</p>
      <p>
        <button type="button" onClick={() => toggle()}>
          Toggle
        </button>
        <button type="button" onClick={() => toggle('Hello')} style={{ margin: '0 8px' }}>
          Toggle Hello
        </button>
        <button type="button" onClick={() => toggle('World')}>
          Toggle World
        </button>
        <button type="button" onClick={setLeft} style={{ margin: '0 8px' }}>
          Set Hello
        </button>
        <button type="button" onClick={setRight}>
          Set World
        </button>
      </p>
    </div>
  );
};
