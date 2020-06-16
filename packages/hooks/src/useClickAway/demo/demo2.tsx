/**
 * title: Custom DOM
 * desc: Support pass in a DOM element directly or a function that returns the DOM element.
 *
 * title.zh-CN: 自定义 DOM
 * desc.zh-CN: 支持直接传入 DOM 对象或通过 function 返回一个对象的方式引入。
 */

import React, { useState } from 'react';
import { useClickAway } from 'ahooks';

export default () => {
  const [counter, setCounter] = useState(0);

  useClickAway(
    () => {
      setCounter((s) => s + 1);
    },
    () => document.getElementById('box2'),
  );

  return (
    <div>
      <button type="button" id="box2">
        box2
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
