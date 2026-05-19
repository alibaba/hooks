import React from 'react';
import useTimer from '..';

export default () => {
  const { seconds, minutes, hours, days, start, pause, reset, isPaused } = useTimer<number>(
    1000 * 3,
    {
      onComplete: () => {
        console.info('计时完成');
      },
      auto: false,
    },
  );

  return (
    <>
      {isPaused && <span>暂停中</span>}
      <div>
        {days ? <span>{days}天 </span> : null}
        <span style={{ fontSize: 20 }}>
          {hours}:{minutes}:{seconds}
        </span>
      </div>
      <button style={{ marginRight: 10 }} onClick={() => start()}>
        开始/恢复
      </button>
      <button style={{ marginRight: 10 }} onClick={() => pause()}>
        暂停
      </button>
      <button style={{ marginRight: 10 }} onClick={() => reset()}>
        复位
      </button>
    </>
  );
};
