import { Table } from 'antd';
import React from 'react';
import useAntdTable from '.';

const Demo = () => {
  const getTableData = ({ current, pageSize, ...rest }) => {
    console.log(current, pageSize, rest);
    return fetch(`https://randomuser.me/api?results=55&page=${current}&size=${pageSize}`)
      .then(res => res.json())
      .then(res => ({
        page: res.info.page,
        total: res.info.results,
        data: res.results,
      }));
  };

  const { tableProps, filters, sorter } = useAntdTable(getTableData, [], {
    defaultPageSize: 5,
  });

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      render(_, record) {
        return record.name.title;
      },
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      sortOrder: sorter.field === 'email' && sorter.order,
      width: 350,
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'gender',
      key: 'gender',
      filters: [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }],
      filteredValue: filters.gender,
      width: 200,
      dataIndex: 'gender',
    },
  ];

  return <Table columns={columns} rowKey="email" {...tableProps} />;
};

export default Demo;
