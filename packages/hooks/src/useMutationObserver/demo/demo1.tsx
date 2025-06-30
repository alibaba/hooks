/**
 * title: Basic usage
 *
 * title.zh-CN: 基础用法
 */

import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { useMutationObserver } from 'ahooks';

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
      <p>mutation count: {count}</p>
      <div
        ref={ref}
        style={{
          width,
          padding: 12,
          border: '1px dashed #ccc',
          borderRadius: 4,
          marginTop: 8,
        }}
      >
        current width: {width}
      </div>
      <Button style={{ marginTop: 8 }} onClick={() => setWidth((w) => w + 10)}>
        Widening
      </Button>
    </div>
  );
};

export default App;
