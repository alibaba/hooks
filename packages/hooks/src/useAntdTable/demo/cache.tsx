import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Table, Select } from 'antd';
import { useAntdTable, clearCache } from 'ahooks';
import ReactJson from 'react-json-view';

const { Option } = Select;

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

const getTableData = (
  { current, pageSize, sorter, filters, extra },
  formData: Object,
): Promise<Result> => {
  console.log(sorter, filters, extra);
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

const UserList = () => {
  const [form] = Form.useForm();

  const { tableProps, search, params } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
    cacheKey: 'useAntdTableCache',
  });

  const { sorter = {}, filters = {} } = params[0] || ({} as any);

  const { type, changeType, submit, reset } = search;

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
      sorter: true,
      sortOrder: sorter.field === 'phone' && sorter.order,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      filters: [
        { text: 'male', value: 'male' },
        { text: 'female', value: 'female' },
      ],
      filteredValue: filters.gender,
    },
  ];

  const advanceSearchForm = (
    <div>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="name" name="name">
              <Input placeholder="name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="email" name="email">
              <Input placeholder="email" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="phone" name="phone">
              <Input placeholder="phone" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} justify="end" style={{ marginBottom: 24 }}>
          <Button type="primary" onClick={submit}>
            Search
          </Button>
          <Button onClick={reset} style={{ marginLeft: 16 }}>
            Reset
          </Button>
          <Button type="link" onClick={changeType}>
            Simple Search
          </Button>
        </Row>
      </Form>
    </div>
  );

  const searchForm = (
    <div style={{ marginBottom: 16 }}>
      <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item name="gender" initialValue="male">
          <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
            <Option value="">all</Option>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        </Form.Item>
        <Form.Item name="name">
          <Input.Search placeholder="enter name" style={{ width: 240 }} onSearch={submit} />
        </Form.Item>
        <Button type="link" onClick={changeType}>
          Advanced Search
        </Button>
      </Form>
    </div>
  );

  return (
    <div>
      {type === 'simple' ? searchForm : advanceSearchForm}
      <Table columns={columns} rowKey="email" style={{ overflow: 'auto' }} {...tableProps} />

      <div style={{ background: '#f5f5f5', padding: 8 }}>
        <p>Current Table:</p>
        <ReactJson src={params[0]!} collapsed={2} />
        <p>Current Form:</p>
        <ReactJson src={params[0]!} collapsed={2} />
      </div>
    </div>
  );
};

const Demo = () => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <Button
        danger
        onClick={() => {
          setShow(!show);
        }}
        style={{ marginBottom: 16 }}
      >
        {show ? 'Click to destroy' : 'Click recovery'}
      </Button>
      <Button
        danger
        onClick={() => {
          clearCache('useAntdTableCache');
        }}
        style={{ marginBottom: 16, marginLeft: 8 }}
      >
        Click to clearCache
      </Button>
      {show && <UserList />}
    </div>
  );
};

export default Demo;
