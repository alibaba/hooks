import React, { useRef } from 'react';
import { useInfiniteScroll } from 'ahooks';

interface Result {
  list: string[];
  nextId: string | undefined;
}

const resultData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

function getLoadMoreList(nextId: string | undefined, limit: number): Promise<Result> {
  let start = 0;
  if (nextId) {
    start = resultData.findIndex((i) => i === nextId);
  }
  const end = start + limit;
  const list = resultData.slice(start, end);
  const nId = resultData.length >= end ? resultData[end] : undefined;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list,
        nextId: nId,
      });
    }, 1000);
  });
}

export default () => {
  const ref = useRef<HTMLDivElement>(null);

  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d) => getLoadMoreList(d?.nextId, 4),
    {
      target: ref,
      isNoMore: (d) => d?.nextId === undefined,
    },
  );

  return (
    <div ref={ref} style={{ height: 150, overflow: 'auto', border: '1px solid', padding: 12 }}>
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
        {!noMore && (
          <button type="button" onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading more...' : 'Click to load more'}
          </button>
        )}

        {noMore && <span>No more data</span>}
      </div>
    </div>
  );
};
