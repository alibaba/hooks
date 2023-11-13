import React, { useState } from 'react';
import { useBoolean, useKeyPress } from 'ahooks';
import { Switch } from 'antd';

export default () => {
  const [counter, setCounter] = useState(0);
  const [observe, { toggle }] = useBoolean();
  useKeyPress(
    'uparrow',
    () => {
      setCounter((s) => s + 1);
    },
    {
      observe,
    },
  );

  return (
    <div>
      <div>
        Switch observe state &nbsp;
        <Switch checked={observe} onChange={toggle} />
      </div>
      <div>Press ArrowUp by key to increase when observe state is checked</div>
      <div>
        counter: <span style={{ color: '#f00' }}>{counter}</span>
      </div>
    </div>
  );
};
