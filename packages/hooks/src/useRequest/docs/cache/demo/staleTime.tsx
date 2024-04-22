import React from 'react';
import Mock from 'mockjs';
import { Button } from 'antd';
import { useRequest, useBoolean } from 'ahooks';

async function getArticle(): Promise<{ data: string; time: number }> {
  console.log('cacheKey-staleTime');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: new Date().getTime(),
      });
    }, 1000);
  });
}

const Article = () => {
  const { data, loading } = useRequest(getArticle, {
    cacheKey: 'staleTime-demo',
    staleTime: 5000,
  });

  if (!data && loading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <p>Background loading: {loading ? 'true' : 'false'}</p>
      <p>Latest request time: {data?.time}</p>
      <p>{data?.data}</p>
    </>
  );
};

export default () => {
  const [state, { toggle }] = useBoolean();

  return (
    <div>
      <Button style={{ marginBottom: 8 }} onClick={() => toggle()}>
        Show/Hidden
      </Button>
      {state && <Article />}
    </div>
  );
};