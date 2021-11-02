import { CheckOutlined } from '@ant-design/icons';
import { useKeyPress } from 'ahooks';
import React, { useState } from 'react';

export default () => {
  const [state, setState] = useState<number>();

  useKeyPress(['shift.c'], () => {
    setState(1);
  });

  useKeyPress(['meta'], () => {
    setState(2);
  });

  useKeyPress('ctrl.alt.c', () => {
    setState(3);
  });

  useKeyPress('ctrl.enter', () => {
    setState(4);
  });

  // Attention: event.key === '0'
  useKeyPress('ctrl.alt.0', () => {
    setState(5);
  });

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>
        1. Modifier key [shift.c]: {state === 1 && <CheckOutlined style={{ color: '#f00' }} />}
      </div>
      <div>
        2. Modifier key [meta]: {state === 2 && <CheckOutlined style={{ color: '#f00' }} />}
      </div>
      <div>
        3. Modifier key [ctrl.alt.c]: {state === 3 && <CheckOutlined style={{ color: '#f00' }} />}
      </div>
      <div>
        4. Modifier key [ctrl.enter]: {state === 4 && <CheckOutlined style={{ color: '#f00' }} />}
      </div>
      <div>
        5. Modifier key [ctrl.alt.0]: {state === 5 && <CheckOutlined style={{ color: '#f00' }} />}
      </div>
    </div>
  );
};
