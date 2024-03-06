/**
 * title: Toggle between any two values
 * description: Accept two optional parameters and toggle between them.
 *
 * title.zh-CN: 在任意两个值之间切换
 * description.zh-CN: 接受两个可选参数，在它们之间进行切换。
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useToggle } from 'ahooks';

export default () => {
  const [state, { toggle, set, setLeft, setRight }] = useToggle('Hello', 'World');

  return (
    <div>
      <Space style={{ marginBottom: 8 }} wrap>
        <Button onClick={toggle}>Toggle</Button>
        <Button onClick={() => set('Hello')}>Set Hello</Button>
        <Button onClick={() => set('World')}>Set World</Button>
        <Button onClick={setLeft}>Set Left</Button>
        <Button onClick={setRight}>Set Right</Button>
      </Space>
      <p>Effects：{state}</p>
    </div>
  );
};
