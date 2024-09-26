import React, { useRef } from 'react';
import { useInfiniteScroll } from 'ahooks';

interface Result {
  list: string[];
  nextId: string | undefined;
}

const resultData = [
  '15',
  '14',
  '13',
  '12',
  '11',
  '10',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  '1',
  '0',
];

function getLoadMoreList(nextId: string | undefined, limit: number): Promise<Result> {
  let start = 0;
  if (nextId) {
    start = resultData.findIndex((i) => i === nextId);
  }
  const end = start + limit;
  const list = resultData.slice(start, end).reverse();
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
  const isFirstIn = useRef(true);

  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d) => getLoadMoreList(d?.nextId, 5),
    {
      target: ref,
      direction: 'top',
      threshold: 0,
      isNoMore: (d) => d?.nextId === undefined,
      onSuccess() {
        if (isFirstIn.current) {
          isFirstIn.current = false;
          setTimeout(() => {
            const el = ref.current;
            if (el) {
              el.scrollTo(0, 999999);
            }
          });
        }
      },
    },
  );

  return (
    <div ref={ref} style={{ height: 150, overflow: 'auto', border: '1px solid', padding: 12 }}>
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          <div style={{ marginBottom: 10 }}>
            {!noMore && (
              <button type="button" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? 'Loading more...' : 'Click to load more'}
              </button>
            )}

            {noMore && <span>No more data</span>}
          </div>
          {data?.list?.map((item) => (
            <div key={item} style={{ padding: 12, border: '1px solid #f5f5f5' }}>
              item-{item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
