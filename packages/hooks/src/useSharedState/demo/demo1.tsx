import React from 'react';
import { createSharedState } from 'ahooks';

const useCount = createSharedState({ count1: 0, count2: 0 });

export default () => {
  return (
    <div>
      <Counter1></Counter1>
      <Counter2></Counter2>
    </div>
  );
};

const Counter1 = () => {
  const [count1, setCount] = useCount((state) => state.count1);
  console.log('Counter1 rendered');
  return (
    <button
      onClick={() =>
        setCount((prevCount) => ({
          count1: prevCount.count1 + 1,
          count2: prevCount.count2,
        }))
      }
    >
      count1 is {count1}
    </button>
  );
};

const Counter2 = () => {
  const [count2, setCount] = useCount((state) => state.count2);
  console.log('Counter2 rendered');
  return (
    <button
      onClick={() =>
        setCount((prevCount) => ({
          count1: prevCount.count1,
          count2: prevCount.count2 + 1,
        }))
      }
    >
      count2 is {count2}
    </button>
  );
};
