import React, { useMemo } from 'react';
import { Spin, Button } from 'antd';
import useAsync from '..';

function getEmail() {
  return fetch('https://randomuser.me/api').then(res => res.json());
}

export default () => {
  const { data, loading, run } = useAsync(() => getEmail(), [], {
    manual: true,
  });
  const email = useMemo(() => (((data || {}).results || [])[0] || {}).email, [data]);
  return (
    <>
      <Spin spinning={loading}>email: {email}</Spin>
      <Button
        onClick={run}
        style={{
          marginTop: 16,
        }}
      >
        fetch
      </Button>
    </>
  );
};
