/**
 * title: Basic usage
 * description: Execute once after 2000ms
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 2000ms 后执行一次
 */

import React, { useState } from 'react';
import { useTimeout } from 'ahooks';

export default () => {
  const [state, setState] = useState(0);

  useTimeout(() => {
    setState(state + 1);
  }, 2000);

  return <div>{state}</div>;
};
