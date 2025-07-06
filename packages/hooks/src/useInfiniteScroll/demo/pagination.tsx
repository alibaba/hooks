import React from 'react';
import { useInfiniteScroll } from 'ahooks';

interface Result {
  list: string[];
  total: number;
}

const resultData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

function getLoadMoreList(page: number, pageSize: number): Promise<Result> {
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  const list = resultData.slice(start, end);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list,
        total: resultData.length,
      });
    }, 1000);
  });
}

const PAGE_SIZE = 4;

export default () => {
  const { data, loading, loadMore, loadingMore } = useInfiniteScroll((d) => {
    const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1;
    return getLoadMoreList(page, PAGE_SIZE);
  });

  const hasMore = data && data.list.length < data.total;

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          {data?.list?.map((item) => (
            <div key={item} style={{ padding: 12, border: '1px solid #f5f5f5' }}>
              item-{item}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 8 }}>
        {hasMore && (
          <button type="button" onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading more...' : 'Click to load more'}
          </button>
        )}

        {!hasMore && <span>No more data</span>}
      </div>
    </div>
  );
};
