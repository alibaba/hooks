import React from 'react';
import { Button, Switch } from 'antd';
import useBoolean from '..';

export default () => {
  const [state, toggle] = useBoolean(true);

  return (
    <div>
      <p>
        Effects：
        <Switch checked={state} onChange={toggle} />
      </p>
      <p>
        <Button type="default" onClick={() => toggle()}>
          Toggle
        </Button>
        <Button type="danger" onClick={() => toggle(false)} style={{ margin: '0 16px' }}>
          Set false
        </Button>
        <Button type="primary" onClick={() => toggle(true)}>
          Set true
        </Button>
      </p>
    </div>
  );
};
