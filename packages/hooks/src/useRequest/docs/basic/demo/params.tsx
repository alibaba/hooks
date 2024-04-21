import React, { useState } from 'react';
import Mock from 'mockjs';
import { useRequest } from 'ahooks';
import { Button, Input, Space } from 'antd';

function getUsername(id: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const [state, setState] = useState('');
  // get username
  const {
    data: username,
    run,
    params,
  } = useRequest(getUsername, {
    defaultParams: ['1'],
  });

  const onChange = () => {
    run(state);
  };

  return (
    <div>
      <p>UserId: {params[0]}</p>
      <p>Username: {username}</p>
      <Space style={{ marginTop: 8 }} wrap>
        <Input
          onChange={(e) => setState(e.target.value)}
          value={state}
          placeholder="Please enter userId"
          style={{ width: 240 }}
        />
        <Button onClick={onChange}>Get User Name</Button>
      </Space>
    </div>
  );
};
