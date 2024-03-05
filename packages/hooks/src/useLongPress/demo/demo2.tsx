/**
 * title: Listen for click and long press events at the same time
 * description:
 *
 * title.zh-CN: 同时监听点击和长按事件
 * description.zh-CN:
 */

import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { useLongPress } from 'ahooks';

export default () => {
  const [pressCounter, setPressCounter] = useState(0);
  const [clickCounter, setClickCounter] = useState(0);

  const ref = useRef<HTMLButtonElement>(null);

  useLongPress(() => setPressCounter((s) => s + 1), ref, {
    onClick: () => setClickCounter((s) => s + 1),
  });

  return (
    <>
      <Button style={{ marginBottom: 8 }} ref={ref}>
        Press me
      </Button>
      <p>pressCounter: {pressCounter}</p>
      <p>clickCounter: {clickCounter}</p>
    </>
  );
};
