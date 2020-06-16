/**
 * title: With Cache
 * desc: In the scenario where `cacheKey` is set, the `params` of `run` can be cached. Using this feature, we can implement caching of pagination-related conditions.
 *
 * title.zh-CN: 带缓存的 Pagination
 * desc.zh-CN: 在 `cacheKey` 场景下， `run` 的参数 `params` 是可以缓存的，利用这个特点，我们可以实现 pagination 相关条件的缓存。
 */

import { useBoolean, useRequest, useUpdateEffect } from '@umijs/hooks';
import { Button, List, Pagination, Select } from 'antd';
import React, { useState } from 'react';
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
  const { state, toggle } = useBoolean();
  return (
    <div>
      <p>You can click the button multiple times, the conditions of pagination will be cached.</p>
      <p>
        <Button onClick={() => toggle()}>show/hidden</Button>
      </p>
      {state && <PaginationComponent />}
    </div>
  )
};

const PaginationComponent = () => {
  const { params, run, data, loading, pagination } = useRequest(
    (p, gender?: string) => getUserList({ ...p, gender }),
    {
      cacheKey: 'paginationDemo',
      paginated: true
    }
  );

  const [gender, setGender] = useState<string>(params[1]);

  useUpdateEffect(() => {
      // reload when gender change
      run({
        current: 1,
        pageSize: 10
      }, gender);
  }, [gender])


  return (
    <div>
      <Select
        value={gender}
        style={{ width: 180, marginBottom: 24 }}
        onChange={(g: string) => setGender(g)}
        placeholder="select gender"
        allowClear
      >
        <Select.Option value="male">male</Select.Option>
        <Select.Option value="female">female</Select.Option>
      </Select>
      <List
        dataSource={data && data.list}
        loading={loading}
        renderItem={item => (
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
