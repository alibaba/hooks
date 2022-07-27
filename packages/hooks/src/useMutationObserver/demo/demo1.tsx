/**
 * title: Basic usage
 *
 * title.zh-CN: 基础用法
 */

import { useMutationObserver } from 'ahooks';
import React, { useRef, useState } from 'react';

const App: React.FC = () => {
  const [width, setWidth] = useState(200);
  const [count, setCount] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const callback: MutationCallback = (mutationsList) => {
    mutationsList.forEach(() => setCount(count + 1));
  };

  useMutationObserver(ref, callback, { attributes: true });

  return (
    <div>
      <div ref={ref} style={{ width, height: 30, border: '1px solid #000', marginBottom: 8 }}>
        current width：{width}
      </div>
      <button onClick={() => setWidth(width + 10)}>widening</button>
      <p>Mutation count {count}</p>
    </div>
  );
};

export default App;
