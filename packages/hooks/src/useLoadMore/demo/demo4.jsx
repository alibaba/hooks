import { List, Button, Avatar } from 'antd';
import React from 'react';
import useLoadMore from '..';

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

const asyncFn = ({ pageSize, offset, startTime }) => {
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
  const { data, loading, loadingMore, reload, loadMore, total, noMore } = useLoadMore(asyncFn, {
    initPageSize: 3,
    incrementSize: 4,
  });

  const renderFooter = () => (
    <>
      {!noMore && (
        <Button onClick={loadMore} loading={loadingMore}>
          {loadingMore ? 'Loading more' : 'Click to load more'}
        </Button>
      )}

      {noMore && <span>No more data</span>}

      <span
        style={{
          float: 'right',
          fontSize: 12,
        }}
      >
        total: {total}
      </span>
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
