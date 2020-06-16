/**
 * title: Default pagination
 * desc: For normal paging scenarios, useRequest will manage `current` and `pageSize` automaticlly.
 *
 * title.zh-CN: 普通分页
 * desc.zh-CN: 普通的分页场景，我们会自动管理 `current` 和 `pageSize`。
 */

import { useRequest } from '@umijs/hooks';
import React from 'react';
import { List, Pagination } from 'antd';
import Mock from 'mockjs';

interface UserListItem {
  id: string,
  name: string,
  gender: 'male' | 'female',
  email: string,
  disabled: boolean
}

const userList = (current, pageSize) => (
  Mock.mock({
    total: 55,
    [`list|${pageSize}`]: [{
      id: '@guid',
      name: '@cname',
      'gender|1': ['male', 'female'],
      email: '@email',
      disabled: false
    }],
  })
)

async function getUserList(params: { current: number, pageSize: number, gender?: string }): Promise<{ total: number, list: UserListItem[] }> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userList(params.current, params.pageSize))
    }, 1000)
  });
}

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
