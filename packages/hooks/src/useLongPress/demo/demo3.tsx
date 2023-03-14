/**
 * title: Basic usage
 * desc: After the movement threshold is exceeded, the long press event will not be triggered
 *
 * title.zh-CN: 超出移动阈值
 * desc.zh-CN: 超出移动阈值之后，长按事件将不会触发
 */
import React, { useRef, useState } from 'react';
import { useLongPress } from 'ahooks';

export default () => {
  const [pressCounter, setPressCounter] = useState(0);

  const ref = useRef<HTMLButtonElement>(null);

  useLongPress(() => setPressCounter((s) => s + 1), ref, {
    moveThreshold: { x: 30 },
  });

  return (
    <div>
      <button ref={ref} type="button">
        Press me
      </button>
      <p>counter: {pressCounter}</p>
    </div>
  );
};
