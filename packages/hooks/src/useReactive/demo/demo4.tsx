/**
 * desc: The value of `initialState` is React element.
 *
 * desc.zh-CN: 数据对象的属性值是 React 元素。
 */

import React, { useState } from 'react';
import { useReactive } from 'ahooks';

const dom1 = <strong>hello world</strong>;
const dom2 = <i>hello world</i>;

export default () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const state = useReactive({
    dom: dom1,
  });

  return (
    <div>
      <button
        style={{ marginBottom: '10px' }}
        onClick={() => {
          state.dom = toggle ? dom2 : dom1;
          setToggle(!toggle);
        }}
      >
        toggle
      </button>
      <div>{state.dom}</div>
    </div>
  );
};
