/**
 * title: Table with filter and page size switcher
 * desc: use deps properly, when deps changes, page number will be reset.
 *
 * title.zh-CN: 带筛选和分页器的 Table
 * desc.zh-CN: 合理利用 deps，当 deps 变化时，会初始化到第一页
 */

import { Select, Table } from 'antd';
import React, { useState } from 'react';
import { useAntdTable } from '@umijs/hooks'
import { FnParams } from '@umijs/hooks/es/useAntdTable';

const { Option } = Select;

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

type Gender = 'male' | 'female';

const getTableData = ({ current, pageSize, gender }: FnParams<Item>) =>
  fetch(`https://randomuser.me/api?results=55&page=${current}&size=${pageSize}&gender=${gender}`)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      data: res.results,
    }));

export default () => {
  const [gender, setGender] = useState<Gender>('male');
  const { tableProps } = useAntdTable<Result, Item>(
    params =>
      getTableData({
        ...params,
        gender,
      }),
    [gender],
    {
      defaultPageSize: 5,
    },
  );

  const columns = [
    {
      title: 'name',
      dataIndex: 'name.last',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'gender',
      dataIndex: 'gender',
    },
  ];

  return (
    <>
      <Select
        style={{ width: 180, marginBottom: 24 }}
        onChange={g => setGender(g as Gender)}
        placeholder="select gender"
        allowClear
      >
        <Option value="male">male</Option>
        <Option value="female">female</Option>
      </Select>
      <Table
        columns={columns}
        rowKey="email"
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
      />
    </>
  );
};
