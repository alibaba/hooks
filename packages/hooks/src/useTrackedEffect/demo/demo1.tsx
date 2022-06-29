/**
 * title: Default usage
 * desc: Display the changed deps when effect function is executed.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 查看每次 effect 执行时发生变化的依赖项
 */

import React, { useState } from 'react';
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
      <p>Please open the browser console to view the output!</p>
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>count + 1</button>
      </div>
      <div style={{ marginTop: 16 }}>
        <p>Count2: {count2}</p>
        <button onClick={() => setCount2((c) => c + 1)}>count + 1</button>
      </div>
    </div>
  );
};
