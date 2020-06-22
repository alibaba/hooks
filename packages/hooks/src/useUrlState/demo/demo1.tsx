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
  const [state, setState] = useUrlState('count', () => {
    return 0;
  });

  return (
    <>
      <button type="button" onClick={() => setState((c) => c + 1)}>
        add
      </button>
      <button type="button" onClick={() => setState(null)}>
        clear
      </button>
      <div>state: {state}</div>
    </>
  );
};
