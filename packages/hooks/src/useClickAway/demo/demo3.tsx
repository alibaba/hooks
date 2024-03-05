/**
 * title: Support multiple DOM
 * description: Support pass multiple DOM elements.
 *
 * title.zh-CN: 支持多个 DOM 对象
 * description.zh-CN: 支持传入多个目标对象。
 */

import React, { useState, useRef } from 'react';
import { Button, Space } from 'antd';
import { useClickAway } from 'ahooks';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  useClickAway(() => {
    setCounter((s) => s + 1);
  }, [ref1, ref2]);

  return (
    <div>
      <Space>
        <Button ref={ref1}>box1</Button>
        <Button ref={ref2}>box2</Button>
      </Space>
      <p>counter: {counter}</p>
    </div>
  );
};
