/**
 * title: Prevent duplicated submits
 * description: Before the `submit` function finishes, the other click actions will be ignored.
 *
 * title.zh-CN: 防止重复提交
 * description.zh-CN: 在 `submit` 函数执行完成前，其余的点击动作都会被忽略。
 */

import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useLockFn } from 'ahooks';

function mockApiRequest() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

export default () => {
  const [count, setCount] = useState(0);

  const submit = useLockFn(async () => {
    message.info('Start to submit');
    await mockApiRequest();
    setCount((val) => val + 1);
    message.success('Submit finished');
  });

  return (
    <>
      <Button style={{ marginBottom: 8 }} onClick={submit}>
        Submit
      </Button>
      <p>Submit count: {count}</p>
    </>
  );
};
