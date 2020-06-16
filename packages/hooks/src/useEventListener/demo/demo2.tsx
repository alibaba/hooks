/**
 * title: Examples
 * desc: Press any key to preview.
 *
 * title.zh-CN: 使用示例
 * desc.zh-CN: 按下键盘查看效果。
 */

import React, { useState } from 'react';
import useEventListener from '../index';

export default () => {
  const [value, setValue] = useState('');

  const keyDownHandler = (ev:KeyboardEvent) => {
    setValue(ev.code);
  };
  useEventListener('keydown', keyDownHandler);

  return <p>Your press key is {value}</p>;
};
