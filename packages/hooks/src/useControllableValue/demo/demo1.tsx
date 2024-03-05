/**
 * title: Uncontrolled component
 * description: If there is no value in props, the component manage state by self
 *
 * title.zh-CN: 非受控组件
 * description.zh-CN: 如果 props 中没有 value，则组件内部自己管理 state
 */
import React from 'react';
import { Button, Input, Space } from 'antd';
import { useControllableValue } from 'ahooks';

export default (props: any) => {
  const [state, setState] = useControllableValue<string>(props, {
    defaultValue: '',
  });

  return (
    <Space>
      <Input value={state} onChange={(e) => setState(e.target.value)} />
      <Button onClick={() => setState('')}>Clear</Button>
    </Space>
  );
};
