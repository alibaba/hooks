/**
 * title: Basic usage
 * description:
 *
 * title.zh-CN: 基础用法
 * description.zh-CN:
 */

import React from 'react';
import { Button, Input } from 'antd';
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
      <Button style={{ marginRight: 8 }} onClick={() => state.count++}>
        state.count++
      </Button>
      <Button onClick={() => state.count--}>state.count--</Button>
      <p>state.count：{state.count}</p>

      <Input style={{ marginTop: 20 }} onChange={(e) => (state.inputVal = e.target.value)} />
      <p>state.inputVal: {state.inputVal}</p>

      <Input style={{ marginTop: 20 }} onChange={(e) => (state.obj.value = e.target.value)} />
      <p>state.obj.value: {state.obj.value}</p>
    </>
  );
};
