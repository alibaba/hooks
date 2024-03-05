/**
 * title: Default usage
 * description: Update state or props, you can see the output in the console.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 更新 state 或 props，可以在控制台看到输出。
 */

import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useWhyDidYouUpdate } from 'ahooks';

const Demo: React.FC<{ count: number }> = (props) => {
  const [randomNum, setRandomNum] = useState(Math.random());

  useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { ...props, randomNum });

  return (
    <div>
      <div>
        <span>number: {props.count}</span>
      </div>
      <Space>
        randomNum: {randomNum}
        <Button onClick={() => setRandomNum(Math.random)}>🎲</Button>
      </Space>
    </div>
  );
};

export default () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Demo count={count} />
      <Space style={{ margin: '8px 0 16px 0' }}>
        <Button onClick={() => setCount((prevCount) => prevCount - 1)}>count -</Button>
        <Button onClick={() => setCount((prevCount) => prevCount + 1)} style={{ marginLeft: 8 }}>
          count +
        </Button>
      </Space>
      <p>Please open the browser console to view the output!</p>
    </div>
  );
};
