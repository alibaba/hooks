/**
 * title: Result Formatter
 * desc: Use customize formatter
 *
 * title.zh-CN: 结果格式化
 * desc.zh-CN: 传入自定义格式化函数
 */

import React from 'react';
import useCountDown from '../index';

const timeEnd = Date.now() + 3000;

export default () => {
  const [countdown, setTargetDate, formattedRes] = useCountDown(timeEnd, {
    intervalTime: 1000,
    formatter: (_, origin) => `${origin.seconds} seconds left only!`,
  });

  return (
    <>
      <p>Your customize return result: {formattedRes}</p>
      <button
        onClick={() => {
          setTargetDate(timeEnd);
        }}
      >
        Restart
      </button>
    </>
  );
};
