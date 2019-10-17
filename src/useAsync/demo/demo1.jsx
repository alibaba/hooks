import React, { useState, useMemo } from 'react';
import { Spin, Button } from 'antd';
import useAsync from '..';

function getEmail(id) {
  return fetch(`https://randomuser.me/api?id=${id}`).then(res => res.json());
}

export default () => {
  const [state, set] = useState(0);
  const { data, loading, cancel, run } = useAsync(() => getEmail(state), [state]);
  const email = useMemo(() => (((data || {}).results || [])[0] || {}).email, [data]);
  return (
    <>
      <Spin spinning={loading}>
        <div>id: {state}</div> <div>email: {email}</div>
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
