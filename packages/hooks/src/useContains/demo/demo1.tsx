/**
 * title: Default usage
 * desc: Click the button to preview.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 点击按钮查看效果。
 */

import React, { useState, useRef } from 'react';
import { useContains } from 'ahooks';

export default () => {
  const [value, setValue] = useState('default');
  const ref = useRef(null);

  useContains(ref, (isWithin) => {
    setValue(isWithin ? 'within' : 'without');
  });

  return (
    <button ref={ref} type="button">
      You click: {value}
    </button>
  );
};
