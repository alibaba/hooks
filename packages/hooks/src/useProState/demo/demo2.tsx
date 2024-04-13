/**
 * title: Friendly reminder
 * desc: SetMergeState will automatically merge objects. The usage of setState is consistent with useState in hook.
 *
 * title.zh-CN: 温馨提示
 * desc.zh-CN: setMergeState会自动合并对象，setState和hook中useState的用法一致。
 */

import React from 'react';
import { useProState } from 'ahooks';

interface State {
  hello: string;
  value: number;
  [key: string]: any;
}

export default () => {
  const [state, { setState, resetState, setMergeState }] = useProState<State>({
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
        <button
          type="button"
          onClick={() => setMergeState({ foo: 'bar' })}
          style={{ margin: '0 8px' }}
        >
          setMergeState foo
        </button>
        <button type="button" onClick={resetState}>
          resetState
        </button>
      </p>
    </div>
  );
};
