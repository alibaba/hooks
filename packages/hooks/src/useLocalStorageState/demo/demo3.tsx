/**
 * title: Persist objects with function updater
 * desc: function updater is also acceptable with useLocalStorageState.
 *
 * title.zh-CN: 使用 function updater 存储
 * desc.zh-CN: useLocalStorageState 里也可以用 function updater，就像 useState 那样。
 */

import React from 'react';
import { useLocalStorageState } from 'ahooks';

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
      <input
        style={{ width: 200 }}
        defaultValue={user.name}
        placeholder="input user name"
        onChange={(e) => {
          setUser((u: IUser) => ({ ...u, name: e.target.value }));
        }}
      />
    </>
  );
}
