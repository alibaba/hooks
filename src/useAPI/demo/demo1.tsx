import React, { useState, useMemo } from 'react';
import { Spin, Button } from 'antd';
import useAPI from '..';

export default () => {
  const { data, loading } = useAPI({ url: 'https://randomuser.me/api' });
  const email = useMemo(() => (((data || {}).results || [])[0] || {}).email, [data]);

  return (
    <>
      <Spin spinning={loading}>
        <div>email: {email}</div>
      </Spin>
    </>
  );
};
