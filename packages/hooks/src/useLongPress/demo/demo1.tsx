/**
 * title: Default usage
 * description: Please keep pressing button to show effects.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 请长按按钮查看效果。
 */

import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import { useLongPress } from 'ahooks';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);

  useLongPress(() => setCounter((s) => s + 1), ref);

  return (
    <>
      <p>counter: {counter}</p>
      <Button style={{ marginTop: 8 }} ref={ref}>
        Press me
      </Button>
    </>
  );
};
