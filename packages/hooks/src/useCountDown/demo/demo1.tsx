/**
 * title: Basic Usage
 * desc: Basic countdown management.
 *
 * title.zh-CN: 基础使用
 * desc.zh-CN: 基础的倒计时管理。
 */

import React from 'react';
import useCountDown from '../index';

export default () => {
  const [countdown, setTargetDate, formattedRes] = useCountDown('2021-12-31 24:00:00', {
    intervalTime: 1000,
  });
  const { days, hours, minutes, seconds } = formattedRes;

  return (
    <>
      <p>
        距离 2020年12月31日 24:00:00 还有 {days} 天 {hours} 小时 {minutes} 分钟 {seconds} 秒
      </p>
    </>
  );
};
