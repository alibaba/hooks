import { useBoolean } from 'ahooks';
import useRequest from '../../../';
import Mock from 'mockjs';
import React, { useState } from 'react';

const getArticle = async (keyword: string) => {
  console.log('cacheKey', keyword);
  return new Promise<{ data: string; time: number }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: Date.now(),
      });
    }, 1000);
  });
};

const Article = () => {
  const { data, params, loading, run } = useRequest(getArticle, {
    cacheKey: 'cacheKey-demo',
  });

  const [keyword, setKeyword] = useState(params[0] || '');

  if (!data && loading) {
    return <p>Loading</p>;
  }
  return (
    <>
      <div>
        <input
          style={{ width: 300 }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          style={{ marginLeft: 8 }}
          onClick={() => {
            run(keyword);
          }}
        >
          Get
        </button>
      </div>
      <p>Background loading: {loading ? 'true' : 'false'}</p>
      <p>Latest request time: {data?.time}</p>
      <p>Keyword: {keyword}</p>
      <p>{data?.data}</p>
    </>
  );
};

export default () => {
  const [state, { toggle }] = useBoolean();
  return (
    <div>
      <button type="button" onClick={() => toggle()} style={{ marginBottom: 16 }}>
        show/hidden
      </button>
      {state && <Article />}
    </div>
  );
};
