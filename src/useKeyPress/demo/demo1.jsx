import React, { useState } from 'react';
import useKeyPress from '..';

export default () => {
  const [counter, setCounter] = useState(0);

  useKeyPress('ArrowUp', event => {
    setCounter(s => s + 1);
  });

  // 此处为 ArrowDown 的 keyCode 值
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
