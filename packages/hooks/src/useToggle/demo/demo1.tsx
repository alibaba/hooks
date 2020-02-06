/**
 * title: Default usage
 * desc: use boolean value as default，use it as same as useBoolean.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 默认为 boolean 切换，基本用法与 useBoolean 一致。
 */

import React from 'react';
import { Button, Switch } from 'antd';
import { useToggle } from '@umijs/hooks';

export default () => {
  const { state, toggle } = useToggle();

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
          Toggle False
        </Button>
        <Button type="primary" onClick={() => toggle(true)}>
          Toggle True
        </Button>
      </p>
    </div>
  );
};
