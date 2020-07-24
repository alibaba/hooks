/**
 * title: Default usage
 * desc: store the state into url query parameter
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: 将状态同步到 url query 中
 */

import React from 'react';
import { useUrlState } from 'ahooks';

export default () => {
  const [state, setState] = useUrlState(() => ({ count: 1 }));

  return (
    <>
      <button type="button" onClick={() => setState((v) => ({ ...v, count: (v.count || 0) + 1 }))}>
        add
      </button>
      <button type="button" onClick={() => setState({ count: undefined })}>
        clear
      </button>
      <div>state: {state?.count}</div>
    </>
  );
};
