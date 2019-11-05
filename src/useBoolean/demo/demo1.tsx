import React from 'react';
import { Button, Switch } from 'antd';
import useBoolean from '..';

export default () => {
  const { state, toggle, setTrue, setFalse } = useBoolean(true);

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
        <Button type="default" onClick={() => toggle(false)} style={{ margin: '0 16px' }}>
          Toggle False
        </Button>
        <Button type="default" onClick={() => toggle(true)}>
          Toggle True
        </Button>
        <Button type="danger" onClick={setFalse} style={{ margin: '0 16px' }}>
          Set false
        </Button>
        <Button type="primary" onClick={setTrue}>
          Set true
        </Button>
      </p>
    </div>
  );
};
