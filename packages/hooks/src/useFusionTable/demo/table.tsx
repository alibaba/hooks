import { Pagination, Table } from '@alifd/next';
import React from 'react';
import { useFusionTable } from 'ahooks';

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
  list: Item[];
}

const getTableData = ({ current, pageSize }): Promise<Result> => {
  const query = `page=${current}&size=${pageSize}`;

  return fetch(`https://randomuser.me/api?results=${pageSize}&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: 55,
      list: res.results.slice(0, 10),
    }));
};

const AppList = () => {
  const { paginationProps, tableProps } = useFusionTable(getTableData);

  return (
    <>
      <Table {...tableProps} primaryKey="email">
        <Table.Column title="name" dataIndex="name.last" width={140} />
        <Table.Column title="email" dataIndex="email" width={500} />
        <Table.Column title="phone" dataIndex="phone" width={500} />
        <Table.Column title="gender" dataIndex="gender" width={500} />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
    </>
  );
};

export default AppList;
