import React, { useState } from 'react';
import Mock from 'mockjs';
import { Button, Input, Space } from 'antd';
import { useRequest, useBoolean } from 'ahooks';

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
    <div>
      <Space style={{ marginBottom: 8 }} wrap>
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <Button onClick={() => run(keyword)}>Get</Button>
      </Space>
      <p>Background loading: {loading ? 'true' : 'false'}</p>
      <p>Latest request time: {data?.time}</p>
      <p>Keyword: {keyword}</p>
      <p>{data?.data}</p>
    </div>
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
