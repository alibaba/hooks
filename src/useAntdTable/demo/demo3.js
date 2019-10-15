import { Button, Form, Input, Table } from 'antd';
import React, { useState } from 'react';
import useAntdTable from '..';

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

const AppList = props => {
  const { getFieldDecorator } = props.form;
  const {
    tableProps,
    search: { type, changeType, submit, reset },
  } = useAntdTable(getTableData, [], {
    defaultPageSize: 5,
    form: props.form,
    id: 'tableId',
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

  const searchFrom = (
    <div style={{ marginBottom: 16 }}>
      <Form style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {getFieldDecorator('name')(
          <Input placeholder="enter name" style={{ width: 140, marginRight: 16 }} />,
        )}

        {type === 'advance' && (
          <>
            {getFieldDecorator('email')(
              <Input placeholder="enter email" style={{ width: 140, marginRight: 16 }} />,
            )}
            {getFieldDecorator('phone')(
              <Input placeholder="enter phone" style={{ width: 140, marginRight: 16 }} />,
            )}
          </>
        )}
        <Button type="primary" onClick={submit}>
          搜索
        </Button>
        <Button onClick={reset} style={{ marginLeft: 8 }}>
          重置
        </Button>
        <Button type="link" onClick={changeType}>
          {type === 'simple' ? '展开' : '关闭'}
        </Button>
      </Form>
    </div>
  );

  return (
    <div>
      {searchFrom}
      <Table
        columns={columns}
        rowKey="email"
        {...tableProps}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          ...tableProps.pagination,
        }}
      />
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
        style={{ marginBottom: 16 }}
      >
        {show ? '点击销毁' : '点击恢复'}
      </Button>
      {show && <AppListTable />}
    </div>
  );
};

export default Demo;
