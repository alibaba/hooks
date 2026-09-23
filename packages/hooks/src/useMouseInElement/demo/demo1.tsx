/**
 * title: Basic usage
 *
 * title.zh-CN: 基础用法
 */

import { useMouseInElement } from 'ahooks';
import React, { useRef } from 'react';

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isInside } = useMouseInElement(
    ref.current,
    (res) => {
      console.log('inside');
    },
    () => {
      console.log('outside');
    },
  );

  return (
    <div>
      <div
        ref={ref}
        style={{ width: 200, height: 200, padding: 12, border: '1px solid #000', marginBottom: 8 }}
      >
        isInside：{String(isInside)}
      </div>
    </div>
  );
};

export default App;
