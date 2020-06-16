/**
 * title: Mutate
 * desc: You can use `mutate` to modify `data`. `mutate` parameters can be` newData` or `(oldData) => newData`
 *
 * title.zh-CN: 突变
 * desc.zh-CN: 你可以通过 `mutate` ，直接修改 `data` 。 `mutate` 函数参数可以为 `newData` 或 `(oldData)=> newData` 。
 */

import { useRequest } from 'ahooks';
import Mock from 'mockjs';
import React, { useState } from 'react';

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const [state, setState] = useState('');
  const { data, mutate } = useRequest(getUsername, {
    onSuccess: (result) => {
      setState(result);
    },
  });

  return (
    <div>
      <p>usrename: {data}</p>
      <input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <button type="button" onClick={() => mutate(state)}>
        Edit
      </button>
    </div>
  );
};
