/**
 * title: Default usage
 * description: Frequent calls run, but the function is executed only after all the clicks have completed 500ms.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 频繁调用 run，但只会在所有点击完成 500ms 后执行一次相关函数
 */

import React, { useState } from 'react';
import { Button } from 'antd';
import { useDebounceFn } from 'ahooks';

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
    <>
      <p>clicked count: {value}</p>
      <Button style={{ marginTop: 8 }} onClick={run}>
        Click fast!
      </Button>
    </>
  );
};
