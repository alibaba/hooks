/**
 * title: Basic usage
 * description:
 *
 * title.zh-CN: 基础用法
 * description.zh-CN:
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useSet } from 'ahooks';

export default () => {
  const [set, { add, remove, reset }] = useSet(['Hello']);

  return (
    <>
      <Space style={{ marginBottom: 8 }}>
        <Button onClick={() => add(String(Date.now()))}>Add Timestamp</Button>
        <Button onClick={() => remove('Hello')} disabled={!set.has('Hello')}>
          Remove Hello
        </Button>
        <Button onClick={() => reset()}>Reset</Button>
      </Space>
      <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
    </>
  );
};
