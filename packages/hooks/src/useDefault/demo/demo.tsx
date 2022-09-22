import React from 'react';
import { Input, Button } from 'antd';
import useDefault from '../useDefault';

const Demo = () => {
  const [user, setUser] = useDefault({ name: 'hookA' }, { name: 'hookB' });
  return (
    <>
      <div>User: {user.name}</div>
      <Input onChange={(e) => setUser({ name: e.target.value })}></Input>
      <Button onClick={() => setUser(null)}>clear</Button>
    </>
  );
};

export default Demo;
