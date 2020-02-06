/**
 * title: Default usage
 * desc: Automatically handle paged data.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 自动处理分页数据
 */

import { Table } from 'antd';
import React from 'react';
import { useAntdTable } from '@umijs/hooks'
import { FnParams } from '@umijs/hooks/es/useAntdTable';

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

const getTableData = ({ current, pageSize }: FnParams<Item>) =>
  fetch(`https://randomuser.me/api?results=55&page=${current}&size=${pageSize}`)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      data: res.results,
    }));

export default () => {
  const { tableProps } = useAntdTable<Result, Item>(getTableData);

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

  return <Table columns={columns} rowKey="email" {...tableProps} />;
};
