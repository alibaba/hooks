/**
 * title: Updating with callback
 * desc: When using the callback to update, the previous state can be received, and the return value will be automatically merged.
 *
 * title.zh-CN: 使用回调更新
 * desc.zh-CN: 通过回调进行更新，可以获取上一次的状态，并且也会自动合并返回的对象。
 */

import React from 'react';
import { Button } from 'antd';
import { useSetState } from 'ahooks';

interface State {
  hello: string;
  count: number;
}

export default () => {
  const [state, setState] = useSetState<State>({
    hello: 'world',
    count: 0,
  });

  return (
    <>
      <Button
        style={{ marginBottom: 8 }}
        onClick={() => setState((prev) => ({ count: prev.count + 1 }))}
      >
        count + 1
      </Button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};
