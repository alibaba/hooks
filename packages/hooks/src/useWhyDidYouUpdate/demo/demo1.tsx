/**
 * title: Default usage
 * desc: Update state or props, you can see the output in the console
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: 更新 state 或 props，可以在控制台看到输出
 */

import React, { useState, useEffect } from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

const Demo: React.FC<{ count: number }> = (props) => {
  const [randomNum, setRandomNum] = useState(Math.random());

  useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { ...props, randomNum });

  return (
    <div>
      <div>
        <span>number: {props.count}</span>
      </div>
      <div>
        randomNum: {randomNum}
        &nbsp;&nbsp;
        <button onClick={() => setRandomNum(Math.random)}>🎲</button>
      </div>
    </div>
  );
};

export default () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Demo count={count} />
      <div>
        <button onClick={() => setCount((prevCount) => prevCount - 1)}>count -</button>
        &nbsp;&nbsp;
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>count +</button>
      </div>
      <p>Please open the browser console to view the output!</p>
    </div>
  );
};
