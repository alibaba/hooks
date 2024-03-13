/**
 * title: Default usage
 * description: Click the button to preview.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 点击按钮查看效果。
 */

import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import { useEventListener } from 'ahooks';

export default () => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEventListener(
    'click',
    () => {
      setValue(value + 1);
    },
    { target: ref },
  );

  return <Button ref={ref}>You click {value} times</Button>;
};
