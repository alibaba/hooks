/**
 * title: Basic usage
 * desc: Execute once after 3000ms
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 3000ms 后执行一次
 */

import React, { useState } from 'react';
import { useTimeout } from 'ahooks';

export default () => {
  const [state, setState] = useState(1);
  useTimeout(() => {
    setState(state + 1);
  }, 3000);

  return <div>{state}</div>;
};
