/**
 * title: Default usage
 * description:
 *
 * title.zh-CN: 基础用法
 * description.zh-CN:
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useMap } from 'ahooks';

export default () => {
  const [map, { set, setAll, remove, reset, get }] = useMap<string | number, string>([
    ['msg', 'hello world'],
    [123, 'number type'],
  ]);

  return (
    <div>
      <Space wrap>
        <Button onClick={() => set(String(Date.now()), new Date().toJSON())}>Add</Button>
        <Button onClick={() => setAll([['text', 'this is a new Map']])}>Set new Map</Button>
        <Button onClick={() => remove('msg')} disabled={!get('msg')}>
          Remove 'msg'
        </Button>
        <Button onClick={() => reset()}>Reset</Button>
      </Space>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(map), null, 2)}</pre>
      </div>
    </div>
  );
};
