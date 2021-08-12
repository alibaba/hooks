/**
 * title: Default usage
 * desc: Please press the button and then remove the button to see the effect.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 请按一下按钮再移除按钮查看效果。
 */

import React, { useState, useRef } from 'react';
import { useLongPress } from 'ahooks';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef<HTMLButtonElement>();
  const isPressing = useLongPress(() => setCounter((s) => s + 1), ref, { cancelOnMovement: false });

  return (
    <div>
      <button ref={ref} type="button">
        box
      </button>
      <p>counter: {counter}</p>
      <p>isPressing: {isPressing + ''}</p>
    </div>
  );
};
