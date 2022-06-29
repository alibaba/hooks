/**
 * title: Support multiple DOM
 * desc: Support pass multiple DOM elements.
 *
 * title.zh-CN: 支持多个 DOM 对象
 * desc.zh-CN: 支持传入多个目标对象。
 */

import React, { useState, useRef } from 'react';
import { useClickAway } from 'ahooks';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  useClickAway(() => {
    setCounter((s) => s + 1);
  }, [ref1, ref2]);

  return (
    <div>
      <button type="button" ref={ref1}>
        box1
      </button>
      <button type="button" ref={ref2} style={{ marginLeft: 16 }}>
        box2
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
