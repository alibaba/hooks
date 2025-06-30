/**
 * title: Multiple keys
 * description:
 *
 * title.zh-CN: 监听多个按键
 * description.zh-CN:
 */

import { useKeyPress } from 'ahooks';
import React, { useState } from 'react';

const filterKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default () => {
  const [num, setNum] = useState<string>();
  const [key, setKey] = useState<string>();

  useKeyPress(filterKey, (event) => {
    setNum(event.key);
  });

  // a s d f, Backspace, 8
  useKeyPress([65, 83, 68, 70, 8, '8'], (event) => {
    setKey(event.key);
  });

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>
        1. Number key [0-9]: <span style={{ color: '#f00' }}>{num}</span>
      </div>
      <div>
        2. Press key [a, s, d, f, Backspace, 8]: <span style={{ color: '#f00' }}>{key}</span>
      </div>
    </div>
  );
};
