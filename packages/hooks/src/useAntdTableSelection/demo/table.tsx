import { Button, Space, Table } from 'antd';
import React from 'react';
import { useAntdTable, useAntdTableSelection } from 'ahooks';
import ReactJson from 'react-json-view';

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
  id: {
    name: string;
    value: string;
  };
}

interface Result {
  total: number;
  list: Item[];
}

const getTableData = ({ current, pageSize }): Promise<Result> => {
  const query = `page=${current}&size=${pageSize}`;

  return fetch(`https://randomuser.me/api?results=10&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

export default () => {
  const { tableProps } = useAntdTable(getTableData);

  const { state, action, rowSelection } = useAntdTableSelection<Item>(tableProps.dataSource, {
    rowKey: 'email',
    disabled: (row) => row.gender === 'male',
    // getCheckboxProps: (row) => ({ disabled: row.gender === 'female' }),
  });

  const columns = [
    {
      title: 'name',
      dataIndex: ['name', 'last'],
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
      <Space direction="horizontal" size={'middle'} wrap>
        <Button danger={state.allSelected}>{state.allSelected ? 'true' : 'false'}</Button>
        <Button onClick={() => action.toggleAll()}>toggleAll</Button>
        <Button onClick={() => action.toggle(tableProps.dataSource[2])}>
          toggle tableProps.dataSource[2]
        </Button>
        <Button onClick={() => action.selectAll()}>selectAll</Button>
        <Button onClick={() => action.unSelectAll()}>unSelectAll</Button>
        <Button
          onClick={() => action.setSelected(tableProps.dataSource.slice(0, 4).map((t) => t.email))}
        >
          setSelected dataSource.slice(0,4)
        </Button>
      </Space>

      <Table columns={columns} {...tableProps} rowKey="email" rowSelection={rowSelection} />

      <div style={{ background: '#f5f5f5', padding: 8 }}>
        <p>Current selectedRows:</p>
        <ReactJson src={state?.selectedRows} collapsed={1} />
        <p>Current selectedRowKeys:</p>
        <ReactJson src={state?.selectedRowKeys} collapsed={1} />
      </div>
    </>
  );
};
