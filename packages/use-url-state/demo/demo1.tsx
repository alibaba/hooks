/**
 * title: Default usage
 * desc: Store the state into url query. By set the value to `undefind`, the attribute can be removed from the url query.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 将状态同步到 url query 中。通过设置值为 `undefind`, 可以从 url query 上彻底删除某个属性，从而使用默认值。
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
