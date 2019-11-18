import React, { useRef } from 'react';
import { message } from 'antd';
import useClickAway from '..';

export default () => {
  const ref = useRef(null);
  useClickAway(ref, () => {
    message.success('outside clicked');
  });

  return (
    <div
      ref={ref}
      style={{
        width: 200,
        height: 200,
        background: 'red',
      }}
    />
  );
};
