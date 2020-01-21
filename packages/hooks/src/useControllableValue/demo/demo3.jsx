import { Input } from 'antd';
import React, { useState } from 'react';
import useControllableValue from '..';

const ControllableComponent = props => {
  const [state, setState] = useControllableValue(props);
  return (
    <Input
      value={state}
      onChange={e => {
        setState(e.target.value);
      }}
      style={{
        width: 300,
      }}
    />
  );
};

const Parent = () => {
  const [state, setState] = useState(0);
  return (
    <>
      <div
        style={{
          marginBottom: 8,
        }}
      >
        state:{state}
      </div>
      <ControllableComponent onChange={setState} />
    </>
  );
};

export default Parent;
