/**
 * title: Default usage
 * desc: Click the button to preview.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 点击按钮查看效果。
 */

import React, { useState, useRef } from 'react';
import { useEventListener } from 'ahooks';

export default () => {
  const [value, setValue] = useState(0);

  const clickHandler = () => {
    setValue(value + 1);
  };

  const ref = useRef();
  useEventListener('click', clickHandler, { target: ref });

  return (
    <button ref={ref} type="button">
      You click {value} times
    </button>
  );
};
