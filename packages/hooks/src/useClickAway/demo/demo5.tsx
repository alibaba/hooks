/**
 * title: Support multiple events
 * desc: Set up multiple events, you can try using the mouse click or right click.
 *
 * title.zh-CN: 支持传入多个事件名称
 * desc.zh-CN: 设置了多个事件，你可以试试用鼠标左键或者右键。
 */

import React, { useState, useRef } from 'react';
import { useClickAway } from 'ahooks';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef(null);
  useClickAway(
    () => {
      setCounter((s) => s + 1);
    },
    ref,
    ['click', 'contextmenu'],
  );

  return (
    <div>
      <button type="button" ref={ref}>
        box
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
