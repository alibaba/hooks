/**
 * title: Restart a countdown
 * desc: Set a new targetDate to restart with the same duration, suitable for verification codes or similar scenarios.
 *
 * title.zh-CN: 重新开始倒计时
 * desc.zh-CN: 每次更新 targetDate，以相同时长重新开始倒计时，适用于验证码重发等场景，时间结束后会触发 onEnd 回调。
 */

import { useCountDown } from 'ahooks';
import { useState } from 'react';

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
        type="button"
        onClick={() => {
          setTargetDate(Date.now() + 5000);
        }}
        disabled={countdown !== 0}
      >
        {countdown === 0 ? 'Start 5s countdown' : `Restart after ${Math.ceil(countdown / 1000)}s`}
      </button>
      <button
        type="button"
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
