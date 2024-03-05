/**
 * title: Default usage
 * desc: Automatically merge object.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 自动合并对象。
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useSetState } from 'ahooks';

interface State {
  hello: string;
  [key: string]: any;
}

export default () => {
  const [state, setState] = useSetState<State>({
    hello: '',
  });

  return (
    <>
      <Space style={{ marginBottom: 8 }}>
        <Button onClick={() => setState({ hello: 'world' })}>Set hello</Button>
        <Button onClick={() => setState({ foo: 'bar' })}>Set foo</Button>
      </Space>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};
