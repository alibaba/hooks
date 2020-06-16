/**
 * title: custom data loading - timestamp mode
 * desc: If the back-end data is constantly being updated, then just use page, offset, pageSize, etc. to cut the data, and there may be a lot of duplicate data. At this time, if we know the time to pull the data for the first time, then only the data before this timestamp can be cut at the same time, and the correct data can be obtained.
 *
 *  We will record the current time 'startTime' when we first start the request or reload, and pass it to asyncFn.
 *
 * title.zh-CN: 动态数据加载之时间戳模式
 * desc.zh-CN: 如果后端数据在不断更新，那么仅仅使用 page, offset, pageSize 等来切割数据，可能会出现很多的重复的数据。这时候如果我们知道第一次拉取数据的时间，那每次只对这个时间戳之前的数据进行切割，是可以拿到正确数据的。
 *
 *  我们会记录在第一次开始请求或 reload 时，记录当前的时间 startTime，并把它传给 asyncFn。
 */

import { List, Button, Avatar } from 'antd';
import React from 'react';
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
    createTime: 1572783081,
  },
  {
    id: 2,
    title: 'Ant Design Title 2',
    createTime: 1572783082,
  },
  {
    id: 3,
    title: 'Ant Design Title 3',
    createTime: 1572783083,
  },
  {
    id: 4,
    title: 'Ant Design Title 4',
    createTime: 1572783084,
  },
  {
    id: 5,
    title: 'Ant Design Title 5',
    createTime: 1572783085,
  },
  {
    id: 6,
    title: 'Ant Design Title 6',
    createTime: 1572783086,
  },
  {
    id: 7,
    title: 'Ant Design Title 7',
    createTime: 1572783087,
  },
  {
    id: 8,
    title: 'Ant Design Title 8',
    createTime: 1572783088,
  },
  {
    id: 9,
    title: 'Ant Design Title 9',
    createTime: 1572783089,
  },
  {
    id: 10,
    title: 'Ant Design Title 10',
    createTime: 1572783090,
  },
];

const asyncFn = ({ pageSize, offset, startTime }: FnParams): Promise<Result> => {
  /* should query data by timestamp */
  const filteredData = dataSource.filter(i => i.createTime <= startTime);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        total: filteredData.length,
        data: filteredData.slice(offset, offset + pageSize),
      });
    }, 1000);
  });
};

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
