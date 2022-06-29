/**
 * title: Adcanved Uasge
 * desc: Dynamic change targetDate, suitable for verification codes or similar scenarios.
 *
 * title.zh-CN: 进阶使用
 * desc.zh-CN: 动态变更配置项, 适用于验证码或类似场景，时间结束后会触发 onEnd 回调。
 */

import React, { useState } from 'react';
import { useCountDown } from 'ahooks';

export default () => {
  const [targetDate, setTargetDate] = useState<number>();

  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      alert('End of the time');
    },
  });

  return (
    <>
      <button
        onClick={() => {
          setTargetDate(Date.now() + 5000);
        }}
        disabled={countdown !== 0}
      >
        {countdown === 0 ? 'Start Interval' : `Reset After ${Math.round(countdown / 1000)}s`}
      </button>
      <button
        onClick={() => {
          setTargetDate(undefined);
        }}
        style={{ marginLeft: 8 }}
      >
        stop
      </button>
    </>
  );
};
