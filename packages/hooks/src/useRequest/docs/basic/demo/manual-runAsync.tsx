/**
 * title: Edit username
 * description: In this example, we use `runAsync(username)` to edit the user name. At this time, we must catch the exception through catch.
 *
 * title.zh-CN: 修改用户名
 * description.zh-CN: 在这个例子中，我们通过 `runAsync(username)` 来修改用户名，此时必须通过 catch 来自行处理异常。
 */

import React, { useState } from 'react';
import { Button, Input, Space, message } from 'antd';
import { useRequest } from 'ahooks';

function editUsername(username: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject(new Error('Failed to modify username'));
      }
    }, 1000);
  });
}

export default () => {
  const [state, setState] = useState('');
  const { loading, runAsync } = useRequest(editUsername, {
    manual: true,
  });

  const onClick = async () => {
    try {
      await runAsync(state);
      setState('');
      message.success(`The username was changed to "${state}" !`);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Space wrap>
      <Input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240 }}
      />
      <Button disabled={loading} onClick={onClick}>
        {loading ? 'Loading' : 'Edit'}
      </Button>
    </Space>
  );
};
