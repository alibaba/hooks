import React, { useState } from 'react';
import useKeyPress from '..';

export default () => {
  const [counter, setCounter] = useState(0);

  useKeyPress('ArrowUp', event => {
    setCounter(s => s + 1);
  });

  return (
    <div>
      Press arrow up : <span style={{ color: '#f00' }}>{counter}</span>
    </div>
  );
};
