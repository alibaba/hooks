/**
 * title: Adcanved Uasge
 * desc: Controll countdown and interval status manually
 *
 * title.zh-CN: 进阶使用
 * desc.zh-CN: 手动启用并控制计时器状态, 适用于验证码或类似场景
 */

import React from 'react';
import useCountDown from '../index';

const timeEnd = Date.now() + 5000;

export default () => {
  const [countdown, setTargetDate, formattedRes] = useCountDown(undefined, {
    intervalTime: 1000,
  });

  const { seconds } = formattedRes;

  return (
    <>
      <button
        onClick={() => {
          setTargetDate(timeEnd);
        }}
        disabled={seconds !== 0}
      >
        {seconds === 0 ? 'Start Interval' : `Reset In ${seconds}s`}
      </button>
    </>
  );
};
