import { InputNumber, Button } from 'antd';
import React, { useState } from 'react';
import useControllableValue from '..';

const ControllableComponent = props => {
  const [state, setState] = useControllableValue(props);
  return (
    <InputNumber
      value={state}
      onChange={setState}
      style={{
        width: 300,
      }}
    />
  );
};

const Parent = () => {
  const [state, setState] = useState(0);

  const increment = () => {
    setState(s => s + 1);
  };

  const decrease = () => {
    setState(s => s - 1);
  };

  return (
    <>
      <ControllableComponent value={state} onChange={setState} />

      <Button.Group
        style={{
          marginLeft: 16,
        }}
      >
        <Button onClick={increment}>加</Button>
        <Button onClick={decrease}>减</Button>
      </Button.Group>
    </>
  );
};

export default Parent;
