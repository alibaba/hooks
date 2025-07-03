import React from 'react';
import Mock from 'mockjs';
import { Button, Space, message } from 'antd';
import { useRequest, clearCache, useBoolean } from 'ahooks';

const getArticle = async () => {
  return new Promise<{ data: string; time: number }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: Date.now(),
      });
    }, 3000);
  });
};

const Article = ({ cacheKey }) => {
  const { data, loading } = useRequest(getArticle, {
    cacheKey,
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

const clear = (cacheKey?: string | string[]) => {
  clearCache(cacheKey);
  const tips = Array.isArray(cacheKey) ? cacheKey.join('、') : cacheKey;
  message.success(`Clear ${tips ?? 'All'} finished`);
};

export default () => {
  const [state, { toggle }] = useBoolean();

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <Button onClick={() => toggle()}>Show/Hidden</Button>
      </div>
      <Space style={{ marginBottom: 8 }} wrap>
        <Button onClick={() => clear('Article1')}>Clear Article1</Button>
        <Button onClick={() => clear('Article2')}>Clear Article2</Button>
        <Button onClick={() => clear(['Article2', 'Article3'])}>Clear Article2 and Article3</Button>
        <Button onClick={() => clear()}>Clear All</Button>
      </Space>
      <h2>Article 1</h2>
      {state && <Article cacheKey='Article1' />}
      <h2>Article 2</h2>
      {state && <Article cacheKey='Article2' />}
      <h2>Article 3</h2>
      {state && <Article cacheKey='Article3' />}
    </div>
  );
};
