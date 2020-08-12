/**
 * title: Custom multiple DOM target
 * desc: Support pass multiple DOM elements, or functions which returns the DOM element.
 *
 * title.zh-CN: 支持多个 DOM 对象
 * desc.zh-CN: 支持传入多个目标对象。
 */

import React, { useState, useRef } from 'react';
import useClickAway from '../index';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref1 = useRef();
  const ref2 = useRef();
  useClickAway(() => {
    setCounter((s) => s + 1);
  }, [ref1, ref2]);

  return (
    <div>
      <button type="button" ref={ref1}>
        box1
      </button>
      <button type="button" ref={ref2}>
        box2
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
