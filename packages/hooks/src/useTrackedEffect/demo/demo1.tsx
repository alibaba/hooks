/**
 * title: Default usage
 * description: Display the changed deps when effect function is executed.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 查看每次 effect 执行时发生变化的依赖项
 */

import React, { useState } from 'react';
import { Button } from 'antd';
import { useTrackedEffect } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  useTrackedEffect(
    (changes) => {
      console.log('Index of changed dependencies: ', changes);
    },
    [count, count2],
  );

  return (
    <div>
      <p style={{ marginBottom: 16 }}>Please open the browser console to view the output!</p>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={() => setCount((c) => c + 1)}>count + 1</Button>
        <p>Count: {count}</p>
      </div>
      <div>
        <Button onClick={() => setCount2((c) => c + 1)}>count + 1</Button>
        <p>Count2: {count2}</p>
      </div>
    </div>
  );
};
