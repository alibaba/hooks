import React from 'react';
import Mock from 'mockjs';
import { Input } from 'antd';
import { useRequest } from 'ahooks';

async function getEmail(search?: string): Promise<string[]> {
  console.log('throttle getEmail', search);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock({ 'data|5': ['@email'] }).data);
    }, 300);
  });
}

export default () => {
  const { data, loading, run } = useRequest(getEmail, {
    throttleWait: 1000,
    manual: true,
  });

  return (
    <div>
      <Input placeholder="Search Emails" onChange={(e) => run(e.target.value)} />
      {loading ? (
        <p style={{ marginTop: 8 }}>loading</p>
      ) : (
        <ul style={{ margin: '8px 0 0 16px' }}>{data?.map((i) => <li key={i}>{i}</li>)}</ul>
      )}
    </div>
  );
};
