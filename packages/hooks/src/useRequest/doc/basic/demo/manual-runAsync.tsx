/**
 * title: Edit username
 * desc: In this example, we use `runAsync(username)` to edit the user name. At this time, we must catch the exception through catch.
 *
 * title.zh-CN: 修改用户名
 * desc.zh-CN: 在这个例子中，我们通过 `runAsync(username)` 来修改用户名，此时必须通过 catch 来自行处理异常。
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
    <div>
      <input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <button disabled={loading} type="button" onClick={onClick}>
        {loading ? 'Loading' : 'Edit'}
      </button>
    </div>
  );
};
