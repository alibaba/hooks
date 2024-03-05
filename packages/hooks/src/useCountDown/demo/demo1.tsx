/**
 * title: Countdown to target time
 * description: Basic countdown management.
 *
 * title.zh-CN: 到未来某一时间点的倒计时
 * description.zh-CN: 基础的倒计时管理。
 */

import React from 'react';
import { useCountDown } from 'ahooks';

export default () => {
  const [, formattedRes] = useCountDown({
    targetDate: `${new Date().getFullYear()}-12-31 23:59:59`,
  });
  const { days, hours, minutes, seconds, milliseconds } = formattedRes;

  return (
    <p>
      There are {days} days {hours} hours {minutes} minutes {seconds} seconds {milliseconds}{' '}
      milliseconds until {new Date().getFullYear()}-12-31 23:59:59
    </p>
  );
};
