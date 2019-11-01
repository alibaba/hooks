import React from 'react';
import { Button } from 'antd';
import useToggle from '..';

export default () => {
  const [state, toggle] = useToggle('Hello', 'World');

  return (
    <div>
      <p>Effects：{state}</p>
      <p>
        <Button type="default" onClick={() => toggle()}>
          Toggle
        </Button>
        <Button type="danger" onClick={() => toggle('Hello')} style={{ margin: '0 16px' }}>
          Set Hello
        </Button>
        <Button type="primary" onClick={() => toggle('World')}>
          Set World
        </Button>
      </p>
    </div>
  );
};
