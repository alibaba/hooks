/**
 * title: Support shadow DOM
 * description: Add the addEventListener to shadow DOM root instead of the document
 *
 * title.zh-CN: 支持 shadow DOM
 * description.zh-CN: 将 addEventListener 添加到 shadow DOM root
 */

import React, { useState, useRef } from 'react';
import root from 'react-shadow';
import { Button } from 'antd';
import { useClickAway } from 'ahooks';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef(null);

  useClickAway(
    () => {
      setCounter((s) => s + 1);
    },
    ref,
    ['click', 'contextmenu'],
  );

  return (
    <root.div>
      <div>
        <p>counter: {counter}</p>
        <Button ref={ref} style={{ marginTop: 8 }}>
          box
        </Button>
      </div>
    </root.div>
  );
};
