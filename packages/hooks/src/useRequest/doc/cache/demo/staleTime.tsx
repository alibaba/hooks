import { useBoolean } from 'ahooks';
import Mock from 'mockjs';
import React from 'react';
import { useRequest } from 'ahooks';

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
  const { data, loading, refresh } = useRequest(getArticle, {
    cacheKey: 'staleTime-demo',
    staleTime: 5000,
  });
  if (!data && loading) {
    return <p>Loading</p>;
  }
  return (
    <>
      <br />
      <button type="button" onClick={() => refresh()}>
        refresh
      </button>
      <button
        type="button"
        onClick={() =>
          refresh({
            skipStaleTime: true,
          })
        }
        style={{ marginLeft: '10px' }}
      >
        refresh:skipStaleTime
      </button>
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
      <button type="button" style={{ marginBottom: '10px' }} onClick={() => toggle()}>
        show/hidden
      </button>
      {state && <Article />}
    </div>
  );
};
