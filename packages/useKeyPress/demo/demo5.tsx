/**
 * title: Custom DOM
 * desc: |
 *  By default, you listen for events that are mounted on the window. You can also pass in a DOM object or return an object via function.
 *
 *  Supports multiple DOM callbacks, such as the common listening for input box events.
 *
 * title.zh-CN: 自定义 DOM
 * desc.zh-CN: |
 *  默认监听挂载在 window 上的事件，你也可以传入 DOM 对象或通过 function 返回一个对象的方式引入。
 *
 *  如常见的监听输入框事件，支持多种 DOM 回调。
 */

import React, { useState, useRef } from 'react';
import { useKeyPress } from 'ahooks';

export default () => {
  const inputRef = useRef();

  const [text, setText] = useState('');
  const [textRef, setTextRef] = useState('');
  const [textSync, setTextSync] = useState('');
  useKeyPress(
    'enter',
    (event: any) => {
      const { value } = event.target;
      setText(value);
    },
    {
      events: ['keyup'],
      target: () => document.getElementById('input'),
    },
  );

  useKeyPress(
    'enter',
    (event: any) => {
      const { value } = event.target;
      setTextRef(value);
    },
    {
      target: inputRef,
    },
  );

  // Make sure the DOM exists
  useKeyPress(
    () => true,
    (event: any) => {
      const { value } = event.target;
      setTextSync(value);
    },
    {
      events: ['keyup'],
      target: document.getElementById('input2'),
    },
  );

  return (
    <div>
      <div>
        <p>Input and pressing enter: {text}</p>
        <input id="input" style={{ width: 300, marginRight: 24 }} />
      </div>
      <div style={{ marginTop: 24 }}>
        <p>Input and pressing enter: {textRef}</p>
        <input ref={inputRef} style={{ width: 300, marginRight: 24 }} />
      </div>
      <div style={{ marginTop: 24 }}>
        <p>Input after enter change: {textSync}</p>
        <input id="input2" style={{ width: 300, marginRight: 24 }} />
      </div>
    </div>
  );
};
