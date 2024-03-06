/**
 * title: Basic usage
 * description:
 *
 * title.zh-CN: 基础用法
 * description.zh-CN:
 */

import React from 'react';
import { Button, Input, Space } from 'antd';
import { useReactive } from 'ahooks';

export default () => {
  const state = useReactive({
    count: 0,
    inputVal: '',
    obj: {
      value: '',
    },
  });

  return (
    <>
      <p>state.count: {state.count}</p>
      <Space>
        <Button onClick={() => state.count++}>state.count++</Button>
        <Button onClick={() => state.count--}>state.count--</Button>
      </Space>

      <p style={{ marginTop: 20 }}>state.inputVal: {state.inputVal}</p>
      <Input onChange={(e) => (state.inputVal = e.target.value)} />

      <p style={{ marginTop: 20 }}>state.obj.value: {state.obj.value}</p>
      <Input onChange={(e) => (state.obj.value = e.target.value)} />
    </>
  );
};
