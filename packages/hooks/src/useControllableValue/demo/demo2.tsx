/**
 * title: Controlled component
 * desc: If props has the value field, then the state is controlled by it's parent
 *
 * title.zh-CN: 受控组件
 * desc.zh-CN: 如果 props 有 value 字段，则由父级接管控制 state
 */

import { InputNumber, Button } from 'antd';
import React, { useState } from 'react';
import { useControllableValue } from '@umijs/hooks';

const ControllableComponent = (props: any) => {
  const [state, setState] = useControllableValue(props);

  return <InputNumber value={state} onChange={setState} style={{ width: 300 }} />;
};
const Parent = () => {
  const [state, setState] = useState<number>(0);
  const increment = () => {
    setState(s => s + 1);
  };

  const decrease = () => {
    setState(s => s - 1);
  };

  return (
    <>
      <ControllableComponent value={state} onChange={setState} />

      <Button.Group style={{ marginLeft: 16 }}>
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrease}>Decrement</Button>
      </Button.Group>
    </>
  );
};
export default Parent;
