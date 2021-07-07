/**
 * title: Simple example
 * desc: a simple example
 *
 * title.zh-CN: 简单的例子
 * desc.zh-CN: 一个简单使用的例子
 */

import React from 'react';
import useCountDown from '../index';

function Simple() {
  const { time, remaining } = useCountDown({ baseTime: 10 * 60 * 1000 });
  return (
    <div>
      <p>{JSON.stringify(time)}</p>
      <p>{remaining}</p>
    </div>
  );
}

export default Simple;
