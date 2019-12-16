import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useState } from 'react';
import useAPI from '..';

interface UserInfo {
  id: number;
  username: string;
}

const getUserInfo = (): Promise<UserInfo> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: 1,
        username: 'brickspert'
      });
    }, 1000);
  });

export default Form.create()((props: FormComponentProps) => {

  const [state, setState] = useState();

  const { data, mutate } = useAPI(getUserInfo);

  const changeUsername = () => {
    mutate({
      ...data,
      username: state
    });
  }

  return (
    <>
      <div>username: {data && data.username}</div>
      <Input
        style={{ width: 300, margin: `16px 16px 0 0` }}
        placeholder="please enter your username"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <Button onClick={changeUsername}>change</Button>
    </>
  );
});
