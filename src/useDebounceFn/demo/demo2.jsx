import React, { useState } from 'react';
import { Button, Input } from 'antd';
import useDebounceFn from '..';

export default () => {
  const [value, setValue] = useState();
  const [debouncedValue, setDebouncedValue] = useState();
  const { cancel } = useDebounceFn(
    () => {
      setDebouncedValue(value);
    },
    [value],
    1000,
  );
  return (
    <div>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Typed value"
        style={{
          width: 280,
        }}
      />
      <p
        style={{
          margin: '16px 0',
        }}
      >
        <Button onClick={cancel}>Cancel Debounce</Button>
      </p>
      <p>DebouncedValue: {debouncedValue}</p>
    </div>
  );
};
