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
  const [state, setState] = useUrlState(() => ({ demo1Count: '1' }));

  return (
    <>
      <button
        style={{ marginRight: 8 }}
        type="button"
        onClick={() =>
          setState((v) => ({ ...v, demo1Count: (Number(v.demo1Count || 0) + 1).toString() }))
        }
      >
        add
      </button>
      <button type="button" onClick={() => setState((v) => ({ ...v, demo1Count: undefined }))}>
        clear
      </button>
      <div>state: {state?.demo1Count}</div>
    </>
  );
};
