/**
 * title: Custom DOM
 * description: By default, listen for events on the window. You can also pass in a DOM to set listen area. such as the common listening for input box events.
 *
 * title.zh-CN: 自定义 DOM
 * description.zh-CN: |
 *  默认监听挂载在 window 上的事件，你也可以传入 DOM 指定监听区域。
 *
 *  如常见的监听输入框事件，支持多种 DOM 指定方式。
 */

import React, { useState, useRef } from 'react';
import { useKeyPress } from 'ahooks';

export default () => {
  const inputRef = useRef(null);
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
        <input id="input" style={{ width: '100%' }} />
      </div>
      <div style={{ marginTop: 24 }}>
        <p>Input and pressing enter: {textRef}</p>
        <input className="ant-input" ref={inputRef} style={{ width: '100%' }} />
      </div>
      <div style={{ marginTop: 24 }}>
        <p>Input after enter change: {textSync}</p>
        <input id="input2" style={{ width: '100%' }} />
      </div>
    </div>
  );
};
