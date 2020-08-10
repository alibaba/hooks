/**
 * title: advanced usage
 * desc: customize `state getter from url` and `url setter from state`
 *
 * title.zh-CN: 修改 url 切换模式
 * desc.zh-CN: 使用 push 修改 query 参数
 */

import React from 'react';
import useUrlState from '@ahooksjs/use-url-state';

export default () => {
  const [state, setState] = useUrlState<{ demo2Count: string }>(
    { demo2Count: '2' },
    {
      navigateMode: 'push',
    },
  );

  return (
    <>
      <button
        style={{ marginRight: 8 }}
        type="button"
        onClick={() =>
          setState((v) => ({ ...v, demo2Count: (Number(v.demo2Count || 0) + 1).toString() }))
        }
      >
        add
      </button>
      <button type="button" onClick={() => setState((d) => ({ ...d, demo2Count: undefined }))}>
        clear
      </button>
      <div>state: {state?.demo2Count}</div>
    </>
  );
};
