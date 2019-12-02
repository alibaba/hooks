import React, { useState } from 'react';
import useKeyPress from '..';

export default () => {
  const [key, setKey] = useState();
  const filterKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  useKeyPress(
    event => {
      if (event.type === 'keydown') {
        event.preventDefault();
      }
      return !filterKey.includes(event.key);
    },
    event => {
      if (event.type === 'keyup') {
        setKey(event.key);
      }
    },
    ['keydown', 'keyup'],
  );

  return (
    <div>
      Pressing key except number key：<span style={{ color: '#f00' }}>{key}</span>
    </div>
  );
};
