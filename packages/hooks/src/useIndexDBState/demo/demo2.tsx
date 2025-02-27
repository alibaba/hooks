/**
 * title: Store complex object
 * desc: useIndexDBState can store complex objects
 *
 * title.zh-CN: 存储复杂对象
 * desc.zh-CN: useIndexDBState 可以存储复杂对象
 */

import React, { useState } from 'react';
import useIndexDBState from '../index';

interface User {
  name: string;
  age: number;
}

export default function Demo() {
  const [user, setUser] = useIndexDBState<User>('user', {
    defaultValue: { name: 'Ahooks', age: 1 },
  });

  const [inputValue, setInputValue] = useState('');
  const [inputAge, setInputAge] = useState('');

  return (
    <>
      <div>
        <label>Name: </label>
        <input
          value={inputValue}
          placeholder="Please enter name"
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
      </div>
      <div style={{ marginTop: 8 }}>
        <label>Age: </label>
        <input
          value={inputAge}
          placeholder="Please enter age"
          onChange={(e) => setInputAge(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
      </div>
      <div style={{ marginTop: 16 }}>
        <button
          type="button"
          onClick={() => {
            setUser({ name: inputValue, age: Number(inputAge) });
            setInputValue('');
            setInputAge('');
          }}
          style={{ marginRight: 16 }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setUser(undefined)}
          style={{ marginRight: 16 }}
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </>
  );
} 