/**
 * title: Support functional params
 * desc: You can pass a function like useState to update the state
 *
 * title.zh-CN: 支持函数化参数更新
 * desc.zh-CN: 可以像useState那样传递一个函数，来更新状态
 */

import React, { useState } from 'react';
import { useControllableValue } from 'ahooks';

export default (props: any) => {
  const [count, setCount] = useState(1);
  const [count1, setCount1] = useControllableValue(props, { defaultValue: 0 });

  const handleClick = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <>
      <div>
        <h1>useState</h1>
        Count: {count}
        <button onClick={() => setCount(1)}>Reset</button>
        <button onClick={handleClick}>-</button>
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
      </div>
      <div>
        <h1>useControllableValue</h1>
        Count1: {count1}
        <button onClick={() => setCount1(1)}>Reset</button>
        <button onClick={() => setCount1((prevCount) => prevCount - 1)}>-</button>
        <button onClick={() => setCount1((prevCount) => prevCount + 1)}>+</button>
      </div>
    </>
  );
};
