import React, { useState } from 'react';
import { Button } from 'antd';
import useClickAway from '..';

export default () => {
  const [counter, setCounter] = useState(0);
  useClickAway(
    () => {
      setCounter(s => s + 1);
    },
    () => document.getElementById('box2'),
  );
  return (
    <div>
      <Button type="primary" id="box2">
        box2
      </Button>
      <p>counter: {counter}</p>
    </div>
  );
};
