/**
 * title: Default usage
 * desc: Pass in a Set acceptable parameter.
 * 
 * title.zh-CN: 默认用法
 * desc.zh-CN: 传入一个 Set 可接受的参数。
 */

import React from 'react';
import { Button } from 'antd';
import { useSet } from '@umijs/hooks';

export default () => {
  const [set, { add, has, remove, reset }] = useSet(['Hello']);

  return (
    <div>
      <Button type="primary" onClick={() => add(String(Date.now()))}>Add Timestamp</Button>
      <Button type="default" onClick={() => remove('Hello')} disabled={!has('Hello')} style={{ margin: '0 16px' }}>
        Remove Hello
      </Button>
      <Button type="danger" onClick={() => reset()}>Reset</Button>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
      </div>
    </div>
  );
};
