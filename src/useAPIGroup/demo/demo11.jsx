import { Spin } from 'antd';
import React, { useState } from 'react';
import useAPI from '..';

function getDetail(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`this is detail for ${id}`);
    }, 2000);
  });
}

const PageA = () => {
  const { data, loading } = useAPI(() => getDetail('pageA'), {
    cacheKey: 'getPageA',
  });
  return <Spin spinning={!data && loading}>detail: {data}</Spin>;
};

const PageB = () => {
  const { data, loading } = useAPI(() => getDetail('pageB'), {
    cacheKey: 'getPageB',
  });
  return <Spin spinning={!data && loading}>detail: {data}</Spin>;
};

export default () => {
  const [page, setPage] = useState();
  return (
    <div>
      <div>你可以尝试多次进入 pageA，我们会优先返回缓存的数据。</div>
      <ul>
        <li>
          <a onClick={() => setPage('pageA')}>page A</a>
        </li>
        <li>
          <a onClick={() => setPage('pageB')}>page B</a>
        </li>
      </ul>
      <div>
        {page === 'pageA' && <PageA />}
        {page === 'pageB' && <PageB />}
      </div>
    </div>
  );
};
