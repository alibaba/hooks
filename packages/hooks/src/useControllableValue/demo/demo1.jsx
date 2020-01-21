import { InputNumber } from 'antd';
import React from 'react';
import useControllableValue from '..';

export default props => {
  const [state, setState] = useControllableValue(props, {
    defaultValue: 1,
  });
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
