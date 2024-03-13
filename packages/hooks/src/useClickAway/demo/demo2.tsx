/**
 * title: Support DOM
 * description: Support pass in a DOM element or function.
 *
 * title.zh-CN: 支持传入 DOM
 * description.zh-CN: 支持直接传入 DOM 对象或 function。
 */

import React, { useState } from 'react';
import { Button } from 'antd';
import { useClickAway } from 'ahooks';

export default () => {
  const [counter, setCounter] = useState(0);

  useClickAway(
    () => {
      setCounter((s) => s + 1);
    },
    () => document.getElementById('use-click-away-button'),
  );

  return (
    <div>
      <p>counter: {counter}</p>
      <Button id="use-click-away-button" style={{ marginTop: 8 }}>
        box
      </Button>
    </div>
  );
};
