import React, { useState } from 'react';
import { Select, Table } from 'antd';
import useAntdTable from '..';

const { Option } = Select;

export default () => {
  const [gender, setGender] = useState();

  const getTableData = ({ current, pageSize }) => {
    console.log(current, pageSize, gender);
    return fetch(
      `https://randomuser.me/api?results=55&page=${current}&size=${pageSize}&gender=${gender}`,
    )
      .then(res => res.json())
      .then(res => ({
        page: res.info.page,
        total: res.info.results,
        data: res.results,
      }));
  };

  const { tableProps } = useAntdTable(getTableData, [gender], {
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
      width: 200,
      dataIndex: 'gender',
    },
  ];

  return (
    <>
      <Select
        style={{ width: 180, marginBottom: 24 }}
        onChange={g => setGender(g)}
        placeholder="性别筛选"
        allowClear
      >
        <Option value="male">male</Option>
        <Option value="female">female</Option>
      </Select>
      <Table columns={columns} rowKey="email" {...tableProps} />
    </>
  );
};
