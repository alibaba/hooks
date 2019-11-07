import { Button, Spin } from 'antd';
import React, { useState } from 'react';
import useAsync from '..';

function getNumber(id) {
  return fetch(`https://helloacm.com/api/random/?n=8&x=4&id=${id}`).then(res => res.json());
}

export default () => {
  const [state, set] = useState(0);
  const { data, loading, cancel, run } = useAsync(() => getNumber(state), [state]);
  return (
    <>
      <Spin spinning={loading}>
        <div>id: {state}</div>
        <div>Number: {data}</div>
      </Spin>
      <Button.Group
        style={{
          marginTop: 16,
        }}
      >
        <Button onClick={run}>reload</Button>
        <Button onClick={cancel}>cancel</Button>
        <Button onClick={() => set(c => c + 1)}>increase id</Button>
      </Button.Group>
    </>
  );
};
