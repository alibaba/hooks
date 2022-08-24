/**
 * title: Edit username
 * desc: In this example, we use `run(username)` to edit the username. When username contains spaces, the `editUsername` function will not be called.
 *
 * title.zh-CN: 修改用户名
 * desc.zh-CN: 在这个例子中，我们通过 `run(username)` 来修改用户名。当你提交的名字包含空格时，会弹出错误提示并且不会发送请求。
 */

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

  const { loading, run, cancel } = useRequest(editUsername, {
    manual: true,
    onSuccess: (result, params) => {
      setState('');
      message.success(`The username was changed to "${params[0]}" !`);
    },
    onError: (error) => {
      message.error(error.message);
    },
    onBefore: ([username]) => {
      if (username.includes(' ')) {
        message.warn(`Username cannot contain spaces!`);
        return false;
      }
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
      <button type="button" onClick={cancel} style={{ marginLeft: 16 }}>
        Cancel
      </button>
    </div>
  );
};
