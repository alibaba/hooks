/**
 * title: Basic Usage
 * desc: Basic countdown management.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 基础的倒计时管理。
 */

import React from 'react';
import { useCountDown } from 'ahooks';

export default () => {
  const [countdown, setTargetDate, formattedRes] = useCountDown({
    targetDate: '2021-12-31 24:00:00',
  });
  const { days, hours, minutes, seconds, milliseconds } = formattedRes;

  return (
    <>
      <p>
        There are {days} days {hours} hours {minutes} minutes {seconds} seconds {milliseconds}{' '}
        milliseconds until 2021-12-31 24:00:00
      </p>
    </>
  );
};
