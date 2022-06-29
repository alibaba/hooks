import { useRequest } from 'ahooks';
import Mock from 'mockjs';
import React, { useState } from 'react';

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
      <input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter userId"
        style={{ width: 240, marginRight: 16 }}
      />
      <button type="button" onClick={onChange}>
        GetUserName
      </button>
      <p style={{ marginTop: 8 }}>UserId: {params[0]}</p>
      <p>Username: {username}</p>
    </div>
  );
};
