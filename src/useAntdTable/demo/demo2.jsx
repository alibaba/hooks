import { Table } from 'antd';
import React from 'react';
import useAntdTable from '..';

const getTableData = ({ current, pageSize, sorter, filters }) => {
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
  const { tableProps, filters, sorter } = useAntdTable(getTableData, {
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
      filters: [
        {
          text: 'male',
          value: 'male',
        },
        {
          text: 'female',
          value: 'female',
        },
      ],
      filteredValue: filters.gender,
    },
  ];
  return <Table columns={columns} rowKey="email" {...tableProps} />;
};
