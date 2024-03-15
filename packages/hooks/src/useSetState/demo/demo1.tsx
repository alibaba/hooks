/**
 * title: Default usage
 * desc: Automatically merge objects and provide the ability to reset state.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 自动合并对象，并且提供重置状态的能力。
 */

import React from 'react';
import { useSetState } from 'ahooks';

interface State {
  hello: string;
  value: number;
  [key: string]: any;
}

export default () => {
  const [state, setState, resetState] = useSetState<State>({
    hello: '',
    value: Math.random(),
  });

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <p>
        <button type="button" onClick={() => setState({ hello: 'world', value: Math.random() })}>
          set hello and value
        </button>
        <button type="button" onClick={() => setState({ foo: 'bar' })} style={{ margin: '0 8px' }}>
          set foo
        </button>
        <button type="button" onClick={resetState}>
          resetState
        </button>
      </p>
    </div>
  );
};
