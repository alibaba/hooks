/**
 * title: The rest of time
 * description: A countdown to the number of milliseconds remaining.
 *
 * title.zh-CN: 剩余时间
 * description.zh-CN: 剩余时间毫秒数的倒计时
 */

import React from 'react';
import { useCountDown } from 'ahooks';

export default () => {
  const [countdown] = useCountDown({
    leftTime: 60 * 1000,
  });

  return <p>{countdown}</p>;
};
