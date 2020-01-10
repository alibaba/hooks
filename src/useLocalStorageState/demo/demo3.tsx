import React from 'react';
import { Input } from 'antd';
import useLocalStorageState from '..';

interface IUser {
  id: number;
  name: string;
  age: number;
}

export default function () {
  const [user, setUser] = useLocalStorageState('user', {
    id: 9234634791,
    name: 'Zhangsan',
    age: 33,
  } as IUser);

  return (
    <>
      <Input
        defaultValue={user.name}
        placeholder="input user name"
        onChange={e => {
          setUser((u: IUser) => ({ ...u, name: e.target.value }));
        }}
      />
    </>
  );
}
