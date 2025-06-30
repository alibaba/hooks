/**
 * title: Default usage
 * description: Frequent calls run, but the function is only executed every 500ms.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 频繁调用 run，但只会每隔 500ms 执行一次相关函数。
 */

import React, { useState } from 'react';
import { Button } from 'antd';
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
      <p>Clicked count: {value}</p>
      <Button style={{ marginTop: 8 }} onClick={run}>
        Click fast!
      </Button>
    </div>
  );
};
