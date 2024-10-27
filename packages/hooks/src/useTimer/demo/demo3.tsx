import React, { useRef } from 'react';
import useTimer from '..';

export default () => {
  const time = useRef(new Date('2028-07-14'));
  const { seconds, minutes, hours, days } = useTimer<Date>(time.current, {
    onComplete: () => console.log('计时结束'),
    isCountDown: true,
  });
  return (
    <div>
      距离2028年洛杉矶奥运会还有{days}天 {hours}:{minutes}:{seconds}
    </div>
  );
};
