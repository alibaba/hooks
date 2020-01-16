import React, { useState } from 'react';
import { Button, Form, Input, Table } from 'antd';
import useAntdTable, { FnParams } from '..';

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

const getTableData = ({ current, pageSize, ...rest }: FnParams<Item>) => {
  console.log(current, pageSize, rest);
  return fetch(`https://randomuser.me/api?results=55&page=${current}&size=${pageSize}`)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      data: res.results,
    }));
};

const AppListTable = () => {
  const [form] = Form.useForm();

  const { tableProps, filters, sorter, search } = useAntdTable<Result, Item>(getTableData, {
    defaultPageSize: 5,
    form,
    id: 'tableId',
  });
  const { type, changeType, submit, reset } = search || {};

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

  const searchFrom = (
    <div style={{ marginBottom: 16 }}>
      <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item label="name" name="name">
          <Input placeholder="enter name" style={{ width: 140, marginRight: 16 }} />
        </Form.Item>

        {type === 'advance' && (
          <>
            <Form.Item label="email" name="email">
              <Input placeholder="enter email" style={{ width: 140, marginRight: 16 }} />
            </Form.Item>
            <Form.Item label="phone" name="phone">
              <Input placeholder="enter phone" style={{ width: 140, marginRight: 16 }} />
            </Form.Item>
          </>
        )}
        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" onClick={submit}>
            Search
          </Button>
          <Button onClick={reset} style={{ marginLeft: 8 }}>
            Reset
          </Button>
          <Button type="link" onClick={changeType}>
            {type === 'simple' ? 'Expand' : 'Close'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div>
      {searchFrom}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};

const Demo = () => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <Button
        type="danger"
        onClick={() => {
          setShow(!show);
        }}
        style={{ marginBottom: 16 }}
      >
        {show ? 'Click to destroy' : 'Click recovery'}
      </Button>
      {show && <AppListTable />}
    </div>
  );
};

export default Demo;
