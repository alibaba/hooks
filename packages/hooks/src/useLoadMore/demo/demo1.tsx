/**
 * title: Click to load more
 * desc: Standard loading more examples.
 *
 * title.zh-CN: 点击加载更多
 * desc.zh-CN: 标准的加载更多例子
 */

import { useLoadMore } from '@umijs/hooks';
import { FnParams } from '@umijs/hooks/es/useLoadMore';
import { Avatar, Button, List } from 'antd';
import React from 'react';

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
  const { data, loading, loadingMore, reload, loadMore, total, noMore } = useLoadMore<Result, Item>(
    asyncFn,
    {
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
    <div>
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
