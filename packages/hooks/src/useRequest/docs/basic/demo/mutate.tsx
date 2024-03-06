/**
 * title: Edit username
 *
 * title.zh-CN: 修改用户名
 */

import React, { useState, useRef } from 'react';
import Mock from 'mockjs';
import { Button, Input, Space, message } from 'antd';
import { useRequest } from 'ahooks';

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

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
  // store last username
  const lastRef = useRef<string>();
  const [state, setState] = useState('');

  // get username
  const { data: username, mutate } = useRequest(getUsername);

  // edit username
  const { run: edit } = useRequest(editUsername, {
    manual: true,
    onSuccess: (result, params) => {
      setState('');
      message.success(`The username was changed to "${params[0]}" !`);
    },
    onError: (error) => {
      message.error(error.message);
      mutate(lastRef.current);
    },
  });

  const onChange = () => {
    lastRef.current = username;
    mutate(state);
    edit(state);
  };

  return (
    <div>
      <p>Username: {username}</p>
      <Space style={{ marginTop: 8 }} wrap>
        <Input
          onChange={(e) => setState(e.target.value)}
          value={state}
          placeholder="Please enter username"
          style={{ width: 240 }}
        />
        <Button onClick={onChange}>Edit</Button>
      </Space>
    </div>
  );
};
