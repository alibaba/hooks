/**
 * title: Default usage
 * desc: Default as a switch function,or accept a parameter to change state
 */

import React from 'react';
import { Button, Switch } from 'antd';
import { useBoolean } from '@umijs/hooks';

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
