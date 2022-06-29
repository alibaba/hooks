/**
 * title: Default usage
 * desc: Please keep pressing button to show effects.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 请长按按钮查看效果。
 */

import React, { useState, useRef } from 'react';
import { useLongPress } from 'ahooks';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);

  useLongPress(() => setCounter((s) => s + 1), ref);

  return (
    <div>
      <button ref={ref} type="button">
        Press me
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
