import { useReactive } from 'ahooks';
import React, { useEffect, useState } from 'react';

const Child = () => {
  const state = useReactive(
    {
      value: 'Loading...',
    },
    { safe: true },
  );

  useEffect(() => {
    setTimeout(() => {
      state.value = 'data loaded from server';
    }, 5000);
  }, []);

  return <div>{state.value}</div>;
};

export default () => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setVisible(false)}>Unmount</button>
      {visible && <Child />}
    </div>
  );
};
