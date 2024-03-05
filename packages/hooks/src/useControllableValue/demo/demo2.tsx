/**
 * title: Controlled component
 * description: If props has the value field, then the state is controlled by it's parent
 *
 * title.zh-CN: 受控组件
 * description.zh-CN: 如果 props 有 value 字段，则由父级接管控制 state
 */

import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import { useControllableValue } from 'ahooks';

const ControllableComponent = (props: any) => {
  const [state, setState] = useControllableValue<string>(props);

  return <Input value={state} onChange={(e) => setState(e.target.value)} />;
};

const Parent = () => {
  const [state, setState] = useState<string>('');

  return (
    <Space>
      <ControllableComponent value={state} onChange={setState} />
      <Button onClick={() => setState('')}>Clear</Button>
    </Space>
  );
};
export default Parent;
