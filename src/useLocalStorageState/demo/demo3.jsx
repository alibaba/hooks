import React from 'react';
import { Input } from 'antd';
import useLocalStorageState from '..';

export default function () {
  const [user, setUser] = useLocalStorageState('user', {
    id: 9234634791,
    name: 'Zhangsan',
    age: 33,
  });
  return (
    <>
      <Input
        style={{ width: 200 }}
        defaultValue={user.name}
        placeholder="input user name"
        onChange={e => {
          setUser(u => ({ ...u, name: e.target.value }));
        }}
      />
    </>
  );
}
