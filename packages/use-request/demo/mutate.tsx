/**
 * title: Mutate
 * desc: You can use `mutate` to modify `data`. `mutate` parameters can be` newData` or `(oldData) => newData`
 *
 * title.zh-CN: 突变
 * desc.zh-CN: 你可以通过 `mutate` ，直接修改 `data` 。 `mutate` 函数参数可以为 `newData` 或 `(oldData)=> newData` 。
 */

import { useRequest } from '@umijs/hooks';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import Mock from 'mockjs';

function getUsername(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

function changeUsername(username: string): Promise<{ success: boolean }> {
  console.log(username);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

export default () => {
  const [state, setState] = useState('');
  const { data, mutate } = useRequest(getUsername, {
    onSuccess: result => {
      setState(result);
    }
  });
  const { loading, run } = useRequest(changeUsername, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        mutate(params[0]);
        message.success(`The username was changed to "${params[0]}" !`);
      }
    }
  });

  return (
    <div>
      <p>usrename: {data}</p>
      <Input
        onChange={e => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <Button onClick={() => run(state)} loading={loading}>
        Edit
      </Button>
    </div>
  );
};
