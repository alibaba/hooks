/**
 * title: Pull up to load more
 * desc: If ref exists in options, loadMore is automatically triggered when scrolling to the bottom.
 *
 * title.zh-CN: 上拉加载更多
 * desc.zh-CN: 如果 options 中存在 ref，则在滚动到底部时，自动触发 loadMore。
 */

import { List, Button, Avatar } from 'antd';
import React, { useRef } from 'react';
import { useLoadMore } from '@umijs/hooks';
import { FnParams } from '@umijs/hooks/es/useLoadMore';

interface Item {
  id: number;
  title: string;
}
interface Result {
  total: number;
  data: Item[];
}

const dataSource = [
  {
    id: 1,
    title: 'Ant Design Title 1',
  },
  {
    id: 2,
    title: 'Ant Design Title 2',
  },
  {
    id: 3,
    title: 'Ant Design Title 3',
  },
  {
    id: 4,
    title: 'Ant Design Title 4',
  },
  {
    id: 5,
    title: 'Ant Design Title 5',
  },
  {
    id: 6,
    title: 'Ant Design Title 6',
  },
  {
    id: 7,
    title: 'Ant Design Title 7',
  },
  {
    id: 8,
    title: 'Ant Design Title 8',
  },
  {
    id: 9,
    title: 'Ant Design Title 9',
  },
  {
    id: 10,
    title: 'Ant Design Title 10',
  },
];

const asyncFn = ({ pageSize, offset }: FnParams): Promise<Result> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        total: dataSource.length,
        data: dataSource.slice(offset, offset + pageSize),
      });
    }, 1000);
  });

export default () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, loading, loadingMore, reload, loadMore, total, noMore } = useLoadMore<Result, Item>(
    asyncFn,
    {
      ref: containerRef,
      initPageSize: 3,
      incrementSize: 4,
    },
  );

  const renderFooter = () => (
    <>
      {!noMore && (
        <Button onClick={loadMore} loading={loadingMore}>
          {loadingMore ? 'Loading more' : 'Click to load more'}
        </Button>
      )}

      {noMore && <span>No more data</span>}

      <span style={{ float: 'right', fontSize: 12 }}>total: {total}</span>
    </>
  );

  return (
    <div ref={containerRef} style={{ height: 300, overflowY: 'auto' }}>
      <List
        header={
          <Button onClick={reload} loading={loading}>
            Reload
          </Button>
        }
        footer={!loading && renderFooter()}
        loading={loading}
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a>{item.title}</a>}
              description="umijs/hooks is a react hooks library"
            />
          </List.Item>
        )}
      />
    </div>
  );
};
