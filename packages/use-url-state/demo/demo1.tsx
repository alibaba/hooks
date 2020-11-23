/**
 * title: Default usage
 * desc: store the state into url query parameter
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 将状态同步到 url query 中
 */

import React from 'react';
import useUrlState from '@ahooksjs/use-url-state';

export default () => {
  const [state, setState] = useUrlState({ count: '1' });

  return (
    <>
      <button
        style={{ marginRight: 8 }}
        type="button"
        onClick={() => setState({ count: Number(state.count || 0) + 1 })}
      >
        add
      </button>
      <button type="button" onClick={() => setState({ count: undefined })}>
        clear
      </button>
      <div>state: {state?.count}</div>
    </>
  );
};
