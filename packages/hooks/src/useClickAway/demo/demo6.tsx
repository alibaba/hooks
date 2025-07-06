/**
 * title: Support shadow DOM
 * desc: Add the addEventListener to shadow DOM root instead of the document
 *
 * title.zh-CN: 支持 shadow DOM
 * desc.zh-CN: 将 addEventListener 添加到 shadow DOM root
 */

import React, { useState, useRef } from 'react';
import { useClickAway } from 'ahooks';
import root from 'react-shadow';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef(null);
  useClickAway(
    () => {
      setCounter((s) => s + 1);
    },
    ref,
    ['click', 'contextmenu'],
  );

  return (
    <root.div>
      <div>
        <button type="button" ref={ref}>
          box
        </button>
        <p>counter: {counter}</p>
      </div>
    </root.div>
  );
};
