/**
 * title: Support event listener options
 * desc: For scenarios where click is blocked from bubbling, you can use event listener options to change the capture phase.
 *
 * title.zh-CN: 支持事件监听选项
 * desc.zh-CN: 针对点击阻止冒泡的场景，可以使用事件监听选项选择捕获阶段。
 */

import React, { useState, useRef } from 'react';
import { useClickAway } from 'ahooks';

export default () => {
  const [counter, setCounter] = useState(0);

  const ref = useRef<HTMLButtonElement>(null);

  useClickAway(() => setCounter((s) => s + 1), ref, 'click', { capture: true });

  return (
    <div>
      <button ref={ref} type='button'>
        box1
      </button>
      <button type='button' style={{ marginLeft: 16 }} onClick={(e) => e.stopPropagation()}>
        box2
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
