import React, { useState } from 'react';
import { Button } from 'antd';
import usePrevious from '..';

export default () => {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);
  return (
    <>
      <div>counter current value: {count}</div>
      <div>counter previous value: {previous}</div>
      <Button.Group>
        <Button onClick={() => setCount(c => c + 1)}> increase </Button>
        <Button onClick={() => setCount(c => c - 1)}> decrease </Button>
      </Button.Group>
    </>
  );
};
