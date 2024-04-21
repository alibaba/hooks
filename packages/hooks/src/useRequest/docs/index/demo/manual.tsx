/**
 * title: Edit username
 * description: In this example, we modify the username.
 *
 * title.zh-CN: 修改用户名
 * description.zh-CN: 在这个例子中，我们尝试修改用户名。
 */

import React, { useState } from 'react';
import { Button, Input, Space, message } from 'antd';
import { useRequest } from 'ahooks';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function changeUsername(username: string): Promise<{ success: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

export default () => {
  const [state, setState] = useState('');

  const { loading, run } = useRequest(changeUsername, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        setState('');
        message.success(`The username was changed to "${params[0]}" !`);
      }
    },
  });

  return (
    <Space>
      <Input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240 }}
      />
      <Button disabled={loading} onClick={() => run(state)}>
        {loading ? 'Loading' : 'Edit'}
      </Button>
    </Space>
  );
};
