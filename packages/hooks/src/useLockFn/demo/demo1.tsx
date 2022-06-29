/**
 * title: Prevent duplicated submits
 * desc: Before the `submit` function finishes, the other click actions will be ignored.
 *
 * title.zh-CN: 防止重复提交
 * desc.zh-CN: 在 `submit` 函数执行完成前，其余的点击动作都会被忽略。
 */

import { useLockFn } from 'ahooks';
import { message } from 'antd';
import React, { useState } from 'react';

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
      <p>Submit count: {count}</p>
      <button onClick={submit}>Submit</button>
    </>
  );
};
