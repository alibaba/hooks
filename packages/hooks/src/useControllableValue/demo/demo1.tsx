/**
 * title: Uncontrolled component
 * desc: If there is no value in props, the component use self-contained state
 *
 * title.zh-CN: 非受控组件
 * desc.zh-CN: 如果 props 中没有 value，则组件内部自理 state
 */

import { InputNumber } from 'antd';
import React from 'react';
import { useControllableValue } from '@umijs/hooks'

export default (props: any) => {
  const [state, setState] = useControllableValue<number>(props, {
    defaultValue: 1,
  });

  return <InputNumber value={state} onChange={setState} style={{ width: 300 }} />;
};
