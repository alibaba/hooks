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

  useMutationObserver(
    (mutationsList) => {
      mutationsList.forEach(() => setCount((c) => c + 1));
    },
    ref,
    { attributes: true },
  );

  return (
    <div>
      <div ref={ref} style={{ width, padding: 12, border: '1px solid #000', marginBottom: 8 }}>
        current width：{width}
      </div>
      <button onClick={() => setWidth((w) => w + 10)}>widening</button>
      <p>Mutation count {count}</p>
    </div>
  );
};

export default App;
