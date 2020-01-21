import { Input } from 'antd';
import React, { useState } from 'react';
import useDebounce from '..';

export default () => {
  const [value, setValue] = useState();
  const debouncedValue = useDebounce(value, 500);

  return (
    <div>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  );
};
