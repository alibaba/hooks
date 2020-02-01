/**
 * title: LoadMore
 *
 * title.zh-CN: 加载更多
 */

import { useBoolean, useRequest } from '@umijs/hooks';
import { Button, Spin, List, Typography } from 'antd';
import React from 'react';
import { getLoadMoreList } from './service';

export default () => {
  const { state, toggle } = useBoolean();
  return (
    <div>
      <p>You can click the button multiple times, the loadmore will be cached.</p>
      <p>
        <Button onClick={() => toggle()}>show/hidden</Button>
      </p>
      {state && <LoadMoreComponent />}
    </div>
  )
};

const LoadMoreComponent = () => {
  const { data, loading, loadMore, loadingMore } = useRequest(nextId => getLoadMoreList(nextId, 3), {
    cacheKey: 'loadMoreDemo',
    loadMore: true
  });

  return (
    <div>
      <Spin spinning={loading}>
        <List
          dataSource={data?.list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Typography.Text mark>[{item.id}]</Typography.Text> {item.name}
            </List.Item>
          )}
        />
      </Spin>
      <Button
        onClick={loadMore}
        loading={loadingMore}
        disabled={!data?.nextId}
      >
        click to load more
      </Button>
    </div>
  );
};
