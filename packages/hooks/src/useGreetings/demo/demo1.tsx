/**
 * title: Use greetings
 * desc: A hook that returns a greeting message based on the current time.
 *
 * title.zh-CN: 使用问候语
 * desc.zh-CN: 一个根据当前时间返回问候消息的挂钩。
 */

import React from 'react';
import { useGreetings } from 'ahooks';

export default () => {
  const greetings = useGreetings();

  return (
    <div>
      <p>Good {greetings}!</p>
    </div>
  );
};
