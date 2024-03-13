import React, { useState } from 'react';
import { Button, Input, Space, message } from 'antd';
import { useRequest } from 'ahooks';

function editUsername(username: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Failed to modify username'));
    }, 1000);
  });
}

export default () => {
  const [state, setState] = useState('');
  const { loading, run } = useRequest(editUsername, {
    retryCount: 3,
    manual: true,
    onError: (error) => {
      message.error(error.message);
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
