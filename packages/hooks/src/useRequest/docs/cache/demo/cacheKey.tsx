import React from 'react';
import Mock from 'mockjs';
import { Button } from 'antd';
import { useBoolean, useRequest } from 'ahooks';

const getArticle = async () => {
  return new Promise<{ data: string; time: number }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: Date.now(),
      });
    }, 1000);
  });
};

const Article: React.FC = () => {
  const { data, loading } = useRequest(getArticle, {
    cacheKey: 'cacheKey-demo',
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
