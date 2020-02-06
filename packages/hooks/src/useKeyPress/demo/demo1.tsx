/**
 * title: Basic usage
 * desc: Supported Key and keyCode in keyboard events, pressing ArrowUp or ArrowDown to show effect.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 支持键盘事件中的 key 和 keyCode，请按 ArrowUp 或 ArrowDown 键进行演示。
 */

import React, { useState } from 'react';
import {useKeyPress} from '@umijs/hooks';

export default () => {
  const [counter, setCounter] = useState(0);

  useKeyPress('ArrowUp', event => {
    setCounter(s => s + 1);
  });

  // keyCode value for ArrowDown
  useKeyPress(40, event => {
    setCounter(s => s - 1);
  });

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>1. Press ArrowUp by key to increase</div>
      <div>2. Press ArrowDown by keyCode to decrease</div>
      <div>
        counter: <span style={{ color: '#f00' }}>{counter}</span>
      </div>
    </div>
  );
};
