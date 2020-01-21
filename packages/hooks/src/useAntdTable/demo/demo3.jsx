import { Select, Table } from 'antd';
import React, { useState } from 'react';
import useAntdTable from '..';

const { Option } = Select;

const getTableData = ({ current, pageSize, gender }) =>
  fetch(`https://randomuser.me/api?results=55&page=${current}&size=${pageSize}&gender=${gender}`)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      data: res.results,
    }));

export default () => {
  const [gender, setGender] = useState('male');
  const { tableProps } = useAntdTable(params => getTableData({ ...params, gender }), [gender], {
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
    },
    {
      title: 'gender',
      dataIndex: 'gender',
    },
  ];
  return (
    <>
      <Select
        style={{
          width: 180,
          marginBottom: 24,
        }}
        onChange={g => setGender(g)}
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
        pagination={{ ...tableProps.pagination, showQuickJumper: true, showSizeChanger: true }}
      />
    </>
  );
};
