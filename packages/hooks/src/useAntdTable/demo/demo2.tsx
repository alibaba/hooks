/**
 * title: Filter And Sorter
 * desc: Retrieve filter and sorter from antd table. Page number will be reset when filter or sorter changes.
 *
 * title.zh-CN: 排序与筛选
 * desc.zh-CN: 自动处理 Table 的排序与筛选，在修改排序或筛选时，会初始化到第一页
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

const getTableData = ({ current, pageSize, sorter, filters }: FnParams<Item>) => {
  console.log(current, pageSize, sorter, filters);
  let url = `https://randomuser.me/api?results=55&page=${current}&size=${pageSize}`;
  if (sorter && sorter.field && sorter.order) {
    url += `&${sorter.field}=${sorter.order}`;
  }
  if (filters) {
    Object.entries(filters).forEach(i => {
      url += `&${i[0]}=${i[1]}`;
    });
  }
  return fetch(url)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      data: res.results,
    }));
};

export default () => {
  const { tableProps, filters, sorter } = useAntdTable<Result, Item>(getTableData, {
    defaultPageSize: 5,
  });

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
      sorter: true,
      sortOrder: sorter.field === 'phone' && sorter.order,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      filters: [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }],
      filteredValue: filters.gender,
    },
  ];

  return <Table columns={columns} rowKey="email" {...tableProps} />;
};
