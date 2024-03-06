import React from 'react';
import Mock from 'mockjs';
import { Button, Divider } from 'antd';
import { useRequest } from 'ahooks';

async function getArticle(): Promise<{ data: string; time: number }> {
  console.log('cacheKey-share');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: new Date().getTime(),
      });
    }, 3000);
  });
}

const Article = () => {
  const { data, loading, refresh } = useRequest(getArticle, {
    cacheKey: 'cacheKey-share',
  });

  if (!data && loading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <p>Background loading: {loading ? 'true' : 'false'}</p>
      <Button style={{ margin: '8px 0' }} onClick={refresh}>
        更新
      </Button>
      <p>Latest request time: {data?.time}</p>
      <p>{data?.data}</p>
    </>
  );
};

export default () => {
  return (
    <div>
      <h2>Article 1</h2>
      <Article />
      <Divider />
      <h2>Article 2</h2>
      <Article />
    </div>
  );
};
