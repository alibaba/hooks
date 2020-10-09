/**
 * title: Default usage
 * desc: Frequent calls run, but the function is only executed every 500ms.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 频繁调用 run，但只会每隔 500ms 执行一次相关函数。
 */

import React, { useState } from 'react';
import { useThrottleFn } from 'ahooks';

export default () => {
  const [value, setValue] = useState(0);
  const { run } = useThrottleFn(
    () => {
      setValue(value + 1);
    },
    { wait: 500 },
  );

  return (
    <div>
      <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
      <button type="button" onClick={run}>
        Click fast!
      </button>
    </div>
  );
};
