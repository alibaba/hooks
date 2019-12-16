import { Spin } from 'antd';
import React, { useState } from 'react';
import useAPI from '..';

function getDetail(id): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`this is detail for ${id}`);
    }, 2000);
  });
}

const PageA = () => {
  const { data, loading } = useAPI(() => getDetail('pageA'), {
    cacheKey: 'getPageA',
  });
  return (
    <Spin spinning={!data && loading}>detail: {data}</Spin>
  );
};

const PageB = () => {
  const { data, loading } = useAPI(() => getDetail('pageB'), {
    cacheKey: 'getPageB',
  });

  return (
    <Spin spinning={!data && loading}>detail: {data}</Spin>
  );
};

export default () => {
  const [page, setPage] = useState<string>();

  const pageA = useAPI(() => getDetail('pageA'), {
    cacheKey: 'getPageA',
    manual: true,
  });
  const pageB = useAPI(() => getDetail('pageB'), {
    cacheKey: 'getPageB',
    manual: true,
  });

  return (
    <div>
      <div>
        <p>1. 你可以 hover 到 pageA 上，等 2s 后，点击进去看看，是否请求结果早已经拿到了。</p>
      </div>
      <ul>
        <li><a onMouseEnter={() => { pageA.run() }} onClick={() => setPage('pageA')}>page A</a></li>
        <li><a onMouseEnter={() => { pageB.run() }} onClick={() => setPage('pageB')}>page B</a></li>
      </ul>
      <div>
        {page === 'pageA' && <PageA />}
        {page === 'pageB' && <PageB />}
      </div>
    </div>
  )
}