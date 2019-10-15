import React, { useMemo } from 'react';
import { Spin, Button } from 'antd';
import useAPI from '..';

export default () => {
  const { data, loading, run } = useAPI({ url: 'https://randomuser.me/api', manual: true });
  const email = useMemo(() => (((data || {}).results || [])[0] || {}).email, [data]);

  return (
    <>
      <Spin spinning={loading}>email: {email}</Spin>
      <Button onClick={run} style={{ marginTop: 16 }}>
        fetch
      </Button>
    </>
  );
};
