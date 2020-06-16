/**
 * title: Use key aliases
 * desc: Support using key aliases. Please refer to the [document](#remarks) below.
 *
 * title.zh-CN: 使用别名
 * desc.zh-CN: 支持使用别名，更多内容请[查看备注](#备注)。
 */

import React, { useState } from 'react';
import {useKeyPress} from '@umijs/hooks';

export default () => {
  const [counter, setCounter] = useState(0);

  useKeyPress('left', event => {
    setCounter(s => s - 1);
  });

  useKeyPress('right', event => {
    setCounter(s => s + 1);
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
