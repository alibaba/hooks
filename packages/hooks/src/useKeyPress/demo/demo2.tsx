/**
 * title: Use key aliases
 * desc: Support using key aliases. Please refer to the [document](#remarks) below.
 *
 * title.zh-CN: 使用别名
 * desc.zh-CN: 支持使用别名，更多内容请[查看备注](#remarks)。
 */

import React, { useState } from 'react';
import { useKeyPress } from 'ahooks';

export default () => {
  const [counter, setCounter] = useState(0);

  useKeyPress('leftarrow', () => {
    setCounter((s) => s - 1);
  });

  useKeyPress('rightarrow', () => {
    setCounter((s) => s + 1);
  });

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>1. Press ArrowLeft to decrease</div>
      <div>2. Press ArrowRight to increase</div>
      <div>
        counter: <span style={{ color: '#f00' }}>{counter}</span>
      </div>
    </div>
  );
};
