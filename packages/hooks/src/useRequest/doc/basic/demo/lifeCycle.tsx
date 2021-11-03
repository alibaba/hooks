import { message } from 'antd';
import React, { useState } from 'react';
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
    <div>
      <input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <button disabled={loading} type="button" onClick={() => run(state)}>
        {loading ? 'Loading' : 'Edit'}
      </button>
    </div>
  );
};
