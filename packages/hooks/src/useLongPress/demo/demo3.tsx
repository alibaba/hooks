/**
 * title: Move threshold
 * description: After the movement threshold is exceeded, the long press event will not be triggered.
 *
 * title.zh-CN: 移动阈值
 * description.zh-CN: 超出移动阈值之后，长按事件将不会触发。
 */

import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { useLongPress } from 'ahooks';

export default () => {
  const [pressCounter, setPressCounter] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);

  useLongPress(() => setPressCounter((s) => s + 1), ref, {
    moveThreshold: { x: 30 },
  });

  return (
    <>
      <p>counter: {pressCounter}</p>
      <Button style={{ marginTop: 8 }} ref={ref}>
        Press me
      </Button>
    </>
  );
};
