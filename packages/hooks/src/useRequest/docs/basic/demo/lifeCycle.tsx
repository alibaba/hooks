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
  const { loading, run } = useRequest(editUsername, {
    manual: true,
    onBefore: (params) => {
      message.info(`Start Request: ${params[0]}`);
    },
    onSuccess: (result, params) => {
      setState('');
      message.success(`The username was changed to "${params[0]}" !`);
    },
    onError: (error) => {
      message.error(error.message);
    },
    onFinally: (params, result, error) => {
      message.info(`Request finish`);
    },
  });

  return (
    <Space wrap>
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
