import React, { useState } from 'react';
import { useBoolean, useKeyPress } from 'ahooks';
import { Switch } from 'antd';

export default () => {
  const [counter, setCounter] = useState(0);
  const [observe, { toggle }] = useBoolean(true);

  useKeyPress(
    'w',
    () => {
      setCounter((prev) => prev + 1);
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
      <div>Press [w] to increase when observe state is checked</div>
      <div>
        counter: <span style={{ color: '#f00' }}>{counter}</span>
      </div>
    </div>
  );
};
