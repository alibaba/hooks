/**
 * title: Basic usage
 * desc: A hook that console logs parameters as component transitions through lifecycles.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 一个在控制台中输出组件生命周期内日志的Hook。
 */

import React, { useState } from 'react';
import { useLogger, useCounter } from 'ahooks';

const Demo = (props) => {
  const [state, { inc }] = useCounter(0);

  useLogger('Demo', props, state);

  return (
    <>
      <p style={{ fontSize: props.size }}>{props.title}</p>
      <button onClick={() => inc()}>Update state ({state})</button>
    </>
  );
};

export default () => {
  const [outerCount, setOutCounter] = useState(24); // default font size

  return (
    <>
      <Demo title="Hello World" size={outerCount} />
      <button onClick={() => setOutCounter((c) => c + 1)}>Increase font size ({outerCount})</button>
    </>
  );
};
