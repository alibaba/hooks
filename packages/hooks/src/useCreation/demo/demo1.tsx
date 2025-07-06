/**
 * title: Make sure only one instance is created
 * desc: You can click the "Rerender" button and trigger the update of this component. But the instance of Foo will not change.
 *
 * title.zh-CN: 确保实例不会被重复创建
 * desc.zh-CN: 点击 "Rerender" 按钮，触发组件的更新，但 Foo 的实例会保持不变
 */

import React, { useState } from 'react';
import { useCreation } from 'ahooks';

class Foo {
  constructor() {
    this.data = Math.random();
  }

  data: number;
}

export default function () {
  const foo = useCreation(() => new Foo(), []);
  const [, setFlag] = useState({});
  return (
    <>
      <p>{foo.data}</p>
      <button
        type="button"
        onClick={() => {
          setFlag({});
        }}
      >
        Rerender
      </button>
    </>
  );
}
