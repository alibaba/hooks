/**
 * title: Default pagination
 * desc: For normal paging scenarios, we will automatically manage `current` and` pageSize`.
 *
 * title.zh-CN: 普通分页
 * desc.zh-CN: 普通的分页场景，我们会自动管理 `current` 和 `pageSize`。
 */

import { useRequest } from '@umijs/hooks';
import React from 'react';
import { List, Pagination } from 'antd';
import { getUserList } from './service';

export default () => {
  const { data, loading, pagination } = useRequest(
    ({ current, pageSize }) => getUserList({ current, pageSize }),
    {
      paginated: true,
    }
  );
  return (
    <div>
      <List
        dataSource={data?.list}
        loading={loading}
        renderItem={(item: any) => (
          <List.Item>
            {item.name} - {item.email}
          </List.Item>
        )}
      />
      <Pagination
        {...(pagination as any)}
        showQuickJumper
        showSizeChanger
        onShowSizeChange={pagination.onChange}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </div>
  );
};
