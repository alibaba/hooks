/**
 * title: Basic usage
 * description:
 *
 * title.zh-CN: 基础用法
 * description.zh-CN:
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useResetState } from 'ahooks';

interface State {
  hello: string;
  count: number;
}

export default () => {
  const [state, setState, resetState] = useResetState<State>({
    hello: '',
    count: 0,
  });

  return (
    <>
      <Space style={{ marginBottom: 8 }} wrap>
        <Button onClick={() => setState({ hello: 'world', count: 1 })}>set hello and count</Button>
        <Button onClick={resetState}>resetState</Button>
      </Space>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};
