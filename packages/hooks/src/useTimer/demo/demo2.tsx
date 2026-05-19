import React, { useRef } from 'react';
import useTimer from '..';

export default () => {
  const time = useRef(new Date(1999, 4, 4));
  const { seconds, minutes, hours, days } = useTimer<Date>(time.current);
  return (
    <div>
      阿里巴巴至今已经{days}天 {hours}:{minutes}:{seconds}
    </div>
  );
};
