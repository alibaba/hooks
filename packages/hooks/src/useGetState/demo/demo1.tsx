import React from 'react';
import { useGetState } from 'ahooks';

export default () => {
  const [count, setCount, getCount] = useGetState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval count', getCount());
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <button onClick={() => setCount(count => count + 1)}>
      count: {count}
    </button>
  );
};
