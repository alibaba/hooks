/**
 * title: Compound mode
 * desc: |
 *  Support for receiving a set of input keys or passing parameters as a combination of keys.
 *
 *  Attention：Key combination only supports the use of modified key + key alias + key in keyboard events, [See detail](#remarks)
 *
 * title.zh-CN: 组合方式
 * desc.zh-CN: |
 *  支持接收一组输入键，或以组合键的方式传递参数。
 *
 *  请注意：组合键方式只支持使用修饰键 + 键位别名 + 键盘事件中的 key 进行组合，更多内容请[查看备注](#备注)。
 */

import React, { useState } from 'react';
import { Icon } from 'antd';
import { useKeyPress } from 'ahooks';

export default () => {
  const [num, setNum] = useState<string>();
  const [key, setKey] = useState<string>();
  const [state, setState] = useState<number>();
  const filterKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  useKeyPress(filterKey, (event) => {
    setNum(event.key);
  });

  // a s d f, Backspace, 8
  useKeyPress([65, 83, 68, 70, 8, '8'], (event) => {
    setKey(event.key);
  });

  useKeyPress(['shift.c'], () => {
    setState(1);
  });

  useKeyPress(['meta'], () => {
    setState(2);
  });

  useKeyPress('ctrl.alt.c', () => {
    setState(3);
  });

  useKeyPress('ctrl.alt.space', () => {
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
        1. Number key [0-9]: <span style={{ color: '#f00' }}>{num}</span>
      </div>
      <div>
        2. Press key [a, s, d, f, Backspace, 8]: <span style={{ color: '#f00' }}>{key}</span>
      </div>
      <div>
        3. Modifier key [shift.c]: {state === 1 && <Icon type="check" style={{ color: '#f00' }} />}
      </div>
      <div>
        4. Modifier key [meta]: {state === 2 && <Icon type="check" style={{ color: '#f00' }} />}
      </div>
      <div>
        5. Modifier key [ctrl.alt.c]:{' '}
        {state === 3 && <Icon type="check" style={{ color: '#f00' }} />}
      </div>
      <div>
        6. Modifier key [ctrl.alt.space]:{' '}
        {state === 4 && <Icon type="check" style={{ color: '#f00' }} />}
      </div>
      <div>
        7. Modifier key [ctrl.alt.0]:{' '}
        {state === 5 && <Icon type="check" style={{ color: '#f00' }} />}
      </div>
    </div>
  );
};
