/**
 * title: Manual trigger
 * desc: If `options.manual` is set, the async function will only be executed when the `run` function is called.
 *
 * title.zh-CN: 手动触发
 * desc.zh-CN: 通过设置 `options.manual = true` , 则需要手动调用 `run` 时才会触发执行异步函数。
 */

import { useRequest } from 'ahooks';
import { message } from 'antd';
import React, { useState } from 'react';

function changeUsername(username: string): Promise<{ success: boolean }> {
  console.log(username);
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
    <div>
      <input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <button disabled={loading} type="button" onClick={() => run(state)}>
        {loading ? 'loading' : 'Edit'}
      </button>
    </div>
  );
};
