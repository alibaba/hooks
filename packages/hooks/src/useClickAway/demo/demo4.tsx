/**
 * title: Listen to other events
 * desc: By setting eventName, you can specify the event to be listened, Try click the right mouse.
 *
 * title.zh-CN: 监听其它事件
 * desc.zh-CN: 通过设置 eventName，可以指定需要监听的事件，试试点击鼠标右键。
 */

import React, { useState, useRef } from 'react';
import { useClickAway } from 'ahooks';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);
  useClickAway(
    () => {
      setCounter((s) => s + 1);
    },
    ref,
    'contextmenu',
  );

  return (
    <div>
      <button ref={ref} type="button">
        box
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
