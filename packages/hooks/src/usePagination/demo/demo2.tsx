/**
 * title: Using deps properly
 * desc: When deps changes, the page number will be reset.
 *
 * title.zh-CN: 合理利用 deps
 * desc.zh-CN: 当 deps 变化时，会初始化到第一页。
 */

import { List, Pagination, Select } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
import React, { useState } from 'react';
import { usePagination } from '@umijs/hooks';
import { FnParams } from '@umijs/hooks/es/usePagination';

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

interface Result {
  total: number;
  data: Item[];
}

const queryData = ({ current, pageSize, gender }: FnParams) =>
  fetch(`https://randomuser.me/api?results=${pageSize}&page=${current}&gender=${gender}`)
    .then(res => res.json())
    .then(res => ({
      total: 55,
      data: res.results,
    }));

export default () => {
  const [gender, setGender] = useState();
  const { data, loading, pagination } = usePagination<Result, Item>(
    params => queryData({ ...params, gender }),
    [gender],
  );
  return (
    <>
      <Select
        style={{ width: 180, marginBottom: 24 }}
        onChange={g => setGender(g)}
        placeholder="select gender"
        allowClear
      >
        <Select.Option value="male">male</Select.Option>
        <Select.Option value="female">female</Select.Option>
      </Select>
      <List
        dataSource={data}
        loading={loading}
        renderItem={item => (
          <List.Item>
            {item.name.last} - {item.email}
          </List.Item>
        )}
      />
      <Pagination
        {...(pagination as PaginationConfig)}
        showQuickJumper
        showSizeChanger
        onShowSizeChange={pagination.onChange}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </>
  );
};
