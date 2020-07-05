/**
 * title: Pull up to load more
 * desc: If `options.ref` is set, loadMore is automatically triggered when scrolling to the bottom. Of course you must set `isNoMore` at this time so that `useRequest` will know when to stop.
 *
 * title.zh-CN: 上拉加载更多
 * desc.zh-CN: 如果 options 中存在 `ref`，则在滚动到底部时，自动触发 loadMore。当然此时你必须设置 `isNoMore`, 以便让 `useRequest` 知道何时停止。
 */

import { useRequest } from 'ahooks';
import React, { useRef } from 'react';

interface Item {
  id: number;
  title: string;
}

interface Result {
  total: number;
  list: Item[];
}

const dataSource = [
  {
    id: 1,
    title: 'ahooks title 1',
  },
  {
    id: 2,
    title: 'ahooks title 2',
  },
  {
    id: 3,
    title: 'ahooks title 3',
  },
  {
    id: 4,
    title: 'ahooks title 4',
  },
  {
    id: 5,
    title: 'ahooks title 5',
  },
  {
    id: 6,
    title: 'ahooks title 6',
  },
  {
    id: 7,
    title: 'ahooks title 7',
  },
  {
    id: 8,
    title: 'ahooks title 8',
  },
  {
    id: 9,
    title: 'ahooks title 9',
  },
  {
    id: 10,
    title: 'ahooks title 10',
  },
];

const asyncFn = ({ pageSize, offset }: any): Promise<Result> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: dataSource.length,
        list: dataSource.slice(offset, offset + pageSize),
      });
    }, 1000);
  });

export default () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, loading, loadingMore, reload, loadMore, noMore } = useRequest(
    (d: Result | undefined) =>
      asyncFn({
        offset: d?.list?.length || 0,
        pageSize: 3,
      }),
    {
      loadMore: true,
      ref: containerRef,
      isNoMore: (d) => (d ? d.list.length >= d.total : false),
    },
  );

  const { list = [] } = data || {};

  return (
    <div ref={containerRef} style={{ height: 200, overflowY: 'auto' }}>
      <button type="button" onClick={reload} disabled={loading}>
        {loading ? 'loading' : 'Reload'}
      </button>
      <ul>
        {list.map((item) => (
          <li style={{ height: 50, borderBottom: '1px', lineHeight: '50px' }}>{item.title}</li>
        ))}
      </ul>
      <div>
        {!noMore && (
          <button type="button" onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading more...' : 'Click to load more'}
          </button>
        )}

        {noMore && <span>No more data</span>}

        <span style={{ float: 'right', fontSize: 12 }}>total: {data?.total}</span>
      </div>
    </div>
  );
};
