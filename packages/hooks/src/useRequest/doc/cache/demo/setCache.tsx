import { useBoolean } from 'ahooks';
import Mock from 'mockjs';
import React from 'react';
import { useRequest } from 'ahooks';

async function getArticle(): Promise<{ data: string; time: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: new Date().getTime(),
      });
    }, 1000);
  });
}

const cacheKey = 'setCache-demo';

const Article = () => {
  const { data, loading } = useRequest(getArticle, {
    cacheKey,
    setCache: (data) => localStorage.setItem(cacheKey, JSON.stringify(data)),
    getCache: () => JSON.parse(localStorage.getItem(cacheKey) || '{}'),
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
      <button type="button" onClick={() => toggle()}>
        show/hidden
      </button>
      {state && <Article />}
    </div>
  );
};
