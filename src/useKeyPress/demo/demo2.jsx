import React, { useState } from 'react';
import { message, Icon } from 'antd';
import useKeyPress from '..';

export default () => {
  const [num, setNum] = useState();
  const [state, setState] = useState();
  const filterKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  useKeyPress(filterKey, event => {
    setNum(event.key);
  });

  useKeyPress(['shift.c'], event => {
    setState(1);
  });

  useKeyPress(['meta'], event => {
    setState(2);
  });

  useKeyPress('ctrl.alt.c', event => {
    setState(3);
  });

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>
        1. Number key（0-9）: <span style={{ color: '#f00' }}>{num}</span>
      </div>
      <div>
        2. Modifier key（shift.c）: {state === 1 && <Icon type="check" style={{ color: '#f00' }} />}
      </div>
      <div>
        3. Modifier key （meta）: {state === 2 && <Icon type="check" style={{ color: '#f00' }} />}
      </div>
      <div>
        4. Modifier key（ctrl.alt.c）:{' '}
        {state === 3 && <Icon type="check" style={{ color: '#f00' }} />}
      </div>
    </div>
  );
};
