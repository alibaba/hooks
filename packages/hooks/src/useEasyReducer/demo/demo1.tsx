/**
 * title: Default usage
 *
 * title.zh-CN: 基本用法
 */

import * as React from 'react';
import { useEasyReducer } from 'ahooks';

const initializer = () => ({ count: 0 });
const processers = {
  increment(state: ReturnType<typeof initializer>) {
    return { count: state.count + 1 };
  },
  decrement(state: ReturnType<typeof initializer>) {
    return { count: state.count - 1 };
  },
  update(state: ReturnType<typeof initializer>, payload: number) {
    return { count: payload };
  },
};

export default () => {
  const [state, { increment, decrement, update }] = useEasyReducer(processers, initializer);

  return (
    <div>
      <button type="button" onClick={() => increment()}>
        Increment
      </button>
      <button type="button" style={{ margin: '0 16px' }} onClick={() => decrement()}>
        Decrement
      </button>
      <button type="button" onClick={() => update(0)}>
        Reset
      </button>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
};
