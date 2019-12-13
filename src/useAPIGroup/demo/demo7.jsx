import { Button, Spin, message } from 'antd';
import React, { useState } from 'react';
import useAPI from '..';

function getNumber(id) {
  message.success(`${id} run`);
  return fetch(`https://helloacm.com/api/random/?n=8&x=4&id=${id}`).then(res => res.json());
}

export default () => {
  const [state, set] = useState(0);
  const { data, loading, cancel, refresh } = useAPI(() => getNumber(state), {
    refreshDeps: [state],
  });
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
        <Button onClick={refresh}>refresh</Button>
        <Button onClick={cancel}>cancel</Button>
        <Button onClick={() => set(c => c + 1)}>increase id</Button>
      </Button.Group>
    </>
  );
};
