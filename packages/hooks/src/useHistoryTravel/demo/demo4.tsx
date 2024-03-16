/**
 * title: Manually record history operations
 * desc: Only when you click commit, the current data will be recorded.
 *
 * title.zh-CN: 手动记录历史操作
 * desc.zh-CN: 只有点击 commit 后，才会记录当前的数据。
 */

import { useHistoryTravel } from 'ahooks';
import React from 'react';

export default () => {
  const { value, setValue, commit, backLength, forwardLength, back, forward } =
    useHistoryTravel<number>(0, {
      manual: true,
    });

  const increment = () => {
    setValue(value ?? 0 + 1);
  };
  const decrement = () => {
    setValue(value ?? 0 - 1);
  };

  return (
    <div>
      <div>Count: {value}</div>
      <div style={{ display: 'flex' }}>
        <div>
          <button onClick={increment} style={{ margin: '0 8px' }}>
            +
          </button>
          <button onClick={decrement} style={{ margin: '0 8px' }}>
            -
          </button>
        </div>
        <div>{'/'}</div>
        <div>
          <button onClick={() => commit()} style={{ margin: '0 8px' }}>
            commit
          </button>
          <button disabled={backLength <= 0} onClick={back} style={{ margin: '0 8px' }}>
            back
          </button>
          <button disabled={forwardLength <= 0} onClick={forward}>
            forward
          </button>
        </div>
      </div>
    </div>
  );
};
