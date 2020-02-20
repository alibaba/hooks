/**
 * title: Pull up to load more
 * desc: If `options.ref` is set, loadMore is automatically triggered when scrolling to the bottom. Of course you must set `isNoMore` at this time so that `useReqeust` will know when to stop.
 *
 * title.zh-CN: 上拉加载更多
 * desc.zh-CN: 如果 options 中存在 `ref`，则在滚动到底部时，自动触发 loadMore。当然此时你必须设置 `isNoMore`, 以便让 `useReqeust` 知道何时停止。
 */

import { useRequest } from '@umijs/hooks';
import { Avatar, Button, List } from 'antd';
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

const asyncFn = ({ pageSize, offset }: any): Promise<Result> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        total: dataSource.length,
        list: dataSource.slice(offset, offset + pageSize),
      });
    }, 1000);
  });

export default () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, loading, loadingMore, reload, loadMore, noMore } = useRequest((d: Result | undefined) => asyncFn({
    offset: d?.list?.length || 0,
    pageSize: 3,
  }), {
    loadMore: true,
    ref: containerRef,
    isNoMore: d => (d ? d.list.length >= d.total : false)
  });

  const { list = [] } = data || {};

  const renderFooter = () => (
    <>
      {!noMore && (
        <Button onClick={loadMore} loading={loadingMore}>
          {loadingMore ? 'Loading more' : 'Click to load more'}
        </Button>
      )}

      {noMore && <span>No more data</span>}

      <span style={{ float: 'right', fontSize: 12 }}>total: {data?.total}</span>
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
        dataSource={list}
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
