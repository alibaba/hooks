/**
 * title: Exact match
 * desc: By configuring `exactMatch`, press [shift + c], listen on [c] will not trigger.
 *
 * title.zh-CN: 精确匹配
 * desc.zh-CN: 通过配置 `exactMatch`, 开启精确匹配，按 [shift + c] ，监听的 [c] 将不会触发。
 */

import { CheckOutlined } from '@ant-design/icons';
import { useKeyPress } from 'ahooks';
import React, { useState } from 'react';

export default () => {
  const [state, setState] = useState<number>();

  useKeyPress(['shift.c'], () => {
    console.log(22);
    setState(1);
  });

  useKeyPress(['shift'], () => {
    setState(2);
  });

  useKeyPress(
    ['c'],
    () => {
      setState(3);
    },
    {
      exactMatch: true,
    },
  );

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>
        1. Modifier key [shift.c]: {state === 1 && <CheckOutlined style={{ color: '#f00' }} />}
      </div>
      <div>
        2. Modifier key [shift]: {state === 2 && <CheckOutlined style={{ color: '#f00' }} />}
      </div>
      <div>3. Modifier key [c]: {state === 3 && <CheckOutlined style={{ color: '#f00' }} />}</div>
    </div>
  );
};
