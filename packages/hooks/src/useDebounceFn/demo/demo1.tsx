/**
 * title: Default usage
 * desc: Frequent calls run, but the function is executed only after all the clicks have completed 500ms.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 频繁调用 run，但只会在所有点击完成 500ms 后执行一次相关函数
 */

import { useDebounceFn } from 'ahooks';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(0);
  const { run } = useDebounceFn(
    () => {
      setValue(value + 1);
    },
    {
      wait: 500,
    },
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
