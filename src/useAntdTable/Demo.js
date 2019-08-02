import { Button, Col, Form, Input, Row, Table } from 'antd';
import React, { useState } from 'react';
import useAntdTable from '.';

const getTableData = ({ current, pageSize, ...rest }) => {
  console.log(current, pageSize, rest);
  return fetch(`https://randomuser.me/api?results=55&page=${current}&size=${pageSize}`).then(res =>
    res.json(),
  );
};

const AppList = props => {
  const { getFieldDecorator } = props.form;

  const {
    data,
    loading,
    changeTable,
    pageSize,
    form: { searchType, changeSearchType, search },
  } = useAntdTable(getTableData, [], {
    defaultPageSize: 5,
    form: props.form,
    id: 'tableId',
  });

  // 未请求服务端时，使用默认数据
  const tableData = data || {
    results: [],
    info: {
      results: 0,
      page: 1,
    },
  };

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

  const advanceSearchForm = (
    <div>
      <Form>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="name">
              {getFieldDecorator('name', {})(<Input placeholder="name" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="email">
              {getFieldDecorator('email', {})(<Input placeholder="email" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="phone">
              {getFieldDecorator('phone', {})(<Input placeholder="phone" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" onClick={search}>
              搜索
            </Button>
            <Button onClick={() => props.form.resetFields()} style={{ marginLeft: 16 }}>
              清空
            </Button>
            <Button type="link" onClick={changeSearchType}>
              简易搜索
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );

  const searchFrom = (
    <div style={{ marginBottom: 16 }}>
      <Form style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {getFieldDecorator('name', {})(
          <Input placeholder="enter name" style={{ width: 240, marginRight: 16 }} />,
        )}
        <Button type="primary" onClick={search}>
          搜索
        </Button>
        <Button type="link" onClick={changeSearchType}>
          高级搜索
        </Button>
      </Form>
    </div>
  );

  return (
    <div>
      {searchType === 'simple' ? searchFrom : advanceSearchForm}
      <Table
        columns={columns}
        loading={loading}
        onChange={changeTable}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          current: tableData.info.page,
          pageSize,
          total: tableData.info.results,
        }}
        dataSource={tableData.results.map((d, index) => ({ ...d, key: index }))}
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
      >
        {show ? '点击销毁' : '点击恢复'}
      </Button>
      {show && <AppListTable />}
    </div>
  );
};

export default Demo;
