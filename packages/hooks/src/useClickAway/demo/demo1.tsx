/**
 * title: Default usage
 * desc: Please click button or outside of button to show effects.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 请点击按钮或按钮外查看效果。
 */

import React, { useState, useRef } from 'react';
import { useClickAway } from 'ahooks';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);
  useClickAway(() => {
    setCounter((s) => s + 1);
  }, ref);

  return (
    <div>
      <button ref={ref} type="button">
        box
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
