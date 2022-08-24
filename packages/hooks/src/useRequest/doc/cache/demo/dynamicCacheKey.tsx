import Mock from 'mockjs';
import React, { useEffect, useState } from 'react';
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

const Article = ({ id }) => {
  const { data, loading, run } = useRequest(getArticle, {
    cacheKey: ([i]: any[]) => `cacheKey-${i}`,
    manual: true,
  });

  useEffect(() => {
    if (id) run(id);
  }, [id]);

  if (!data && loading) {
    return <p>Loading</p>;
  }

  return <p>{data?.data}</p>;
};

export default () => {
  const [input, setInput] = useState('');
  const [id, setId] = useState('');
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="button" onClick={() => setId(input)}>
        Load
      </button>
      <Article id={id} />
    </div>
  );
};
