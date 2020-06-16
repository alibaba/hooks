/**
 * title: custom data loading - ID mode
 * desc: If the data update frequency is very high, there may be multiple data corresponding to the same timestamp, and the timestamp mode above may have problems. At this point we can get the correct data by the id and offset of the last data.
 *
 *  If there is an itemKey field in options, we will send the id of the current last data to asyncFn.
 *
 * title.zh-CN: 动态数据加载之 ID 模式
 * desc.zh-CN: 如果数据更新频率很高，可能同一个时间戳会对应多条数据，那上面的时间戳模式可能出现问题。这时候我们可以通过最后一条数据的 id 和 offset 来获取到正确的数据。
 *
 *  如果 options 中有 itemKey 字段，我们会把当前最后一条数据的 id 发给 asyncFn。
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

const asyncFn = ({ pageSize, id = 0 }: FnParams): Promise<Result> => {
  /* should query data by id */
  const filteredData = dataSource.filter(i => i.id > id);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        total: dataSource.length,
        data: filteredData.slice(0, pageSize),
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
      itemKey: 'id',
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
