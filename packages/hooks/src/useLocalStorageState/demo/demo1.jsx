import React from 'react';
import { Input, Button } from 'antd';
import useLocalStorageState from '..';

export default function () {
  const [message, setMessage] = useLocalStorageState('user-message', 'Hello~');
  return (
    <>
      <Input
        value={message}
        onChange={e => {
          setMessage(e.target.value);
        }}
        placeholder="Please enter some words..."
        style={{
          width: 200,
          marginRight: 16,
        }}
      />
      <Button
        onClick={() => {
          setMessage();
        }}
      >
        Reset
      </Button>
    </>
  );
}
