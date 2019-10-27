import React, { useState, useEffect } from 'react';
import useUpdateEffect from '..';

export default () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const time = setTimeout(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  });

  useUpdateEffect(() => {
    // you can look console count 1 and beyond
    console.log(`count: ${count}`);

    return () => {
      // do something
    };
  }); // you can include deps array if necessary

  return (
    <div>
      <p>initial value: 0</p>
      <p>changed value：{count}</p>
    </div>
  );
};
