/**
 * title: Listen to multiple events.
 * desc: Mouse hover or over the button to preview.
 *
 * title.zh-CN: 监听多个事件
 * desc.zh-CN: 鼠标移入移出按钮查看效果。
 */

import React, { useRef, useState } from 'react';
import { useEventListener } from 'ahooks';

export default () => {
  const ref = useRef(null);
  const [value, setValue] = useState('');

  useEventListener(
    ['mouseenter', 'mouseleave'],
    (ev) => {
      setValue(ev.type);
    },
    { target: ref },
  );

  return (
    <button ref={ref} type="button">
      You Option is {value}
    </button>
  );
};
