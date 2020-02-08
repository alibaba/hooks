/**
 * title: Default usage
 * desc: Click the button to preview.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 点击按钮查看效果。
 */

import React, { useState } from 'react';
import useEventListener from '../index';

export default () => {
  const [value, setValue] = useState(0);

  const clickHandler = () => {
    setValue(value + 1);
  };

  const ref = useEventListener<HTMLButtonElement>('click', clickHandler);

  return <button ref={ref}>You click {value} times</button>;
};
