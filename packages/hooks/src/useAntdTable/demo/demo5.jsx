import { Button, Form, Input, Table } from 'antd';
import React, { useState } from 'react';
import useAntdTable from '..';

const getTableData = ({ current, pageSize, ...rest }) => {
  console.log(current, pageSize, rest);
  return fetch(`https://randomuser.me/api?results=55&page=${current}&size=${pageSize}`)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      data: res.results,
    }));
};

const AppList = props => {
  const { getFieldDecorator } = props.form;
  const { tableProps, filters, sorter, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form: props.form,
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
  const searchFrom = (
    <div
      style={{
        marginBottom: 16,
      }}
    >
      <Form
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {getFieldDecorator('name')(
          <Input
            placeholder="enter name"
            style={{
              width: 140,
              marginRight: 16,
            }}
          />,
        )}

        {type === 'advance' && (
          <>
            {getFieldDecorator('email')(
              <Input
                placeholder="enter email"
                style={{
                  width: 140,
                  marginRight: 16,
                }}
              />,
            )}
            {getFieldDecorator('phone')(
              <Input
                placeholder="enter phone"
                style={{
                  width: 140,
                  marginRight: 16,
                }}
              />,
            )}
          </>
        )}
        <Button type="primary" onClick={submit}>
          Search
        </Button>
        <Button
          onClick={reset}
          style={{
            marginLeft: 8,
          }}
        >
          Reset
        </Button>
        <Button type="link" onClick={changeType}>
          {type === 'simple' ? 'Expand' : 'Close'}
        </Button>
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

const AppListTable = Form.create()(AppList);

const Demo = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <Button
        type="danger"
        onClick={() => {
          setShow(!show);
        }}
        style={{
          marginBottom: 16,
        }}
      >
        {show ? 'Click to destroy' : 'Click recovery'}
      </Button>
      {show && <AppListTable />}
    </div>
  );
};

export default Demo;
