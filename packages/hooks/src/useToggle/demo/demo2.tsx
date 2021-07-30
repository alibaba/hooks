/**
 * title: Toggle between any two values
 * desc: Accept two optional parameters and toggle between them.
 *
 * title.zh-CN: 在任意两个值之间切换
 * desc.zh-CN: 接受两个可选参数，在它们之间进行切换。
 */

import React from 'react';
import { useToggle } from 'ahooks';

export default () => {
  const [state, { toggle, set, setLeft, setRight }] = useToggle('Hello', 'World');

  return (
    <div>
      <p>Effects：{state}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={() => set('Hello')} style={{ margin: '0 8px' }}>
          Set Hello
        </button>
        <button type="button" onClick={() => set('World')}>
          Set World
        </button>
        <button type="button" onClick={setLeft} style={{ margin: '0 8px' }}>
          Set Left
        </button>
        <button type="button" onClick={setRight}>
          Set Right
        </button>
      </p>
    </div>
  );
};
