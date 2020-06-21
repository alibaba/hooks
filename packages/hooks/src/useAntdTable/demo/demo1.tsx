/**
 * title: Form and Table data binding
 * desc: useAntdTable returns a search object after receiving a form instance. This is an example of antd v3, see [link](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useAntdTable/demo/demo3.tsx) for an example of antd v4.
 *
 * title.zh-CN: Form 与 Table 联动
 * desc.zh-CN: useAntdTable 接收 form 实例后，会返回 search 对象。这是一个 antd v3 示例，antd v4 示例见 [链接](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useAntdTable/demo/demo3.tsx)。
 */

import React from 'react';
import { Button, Col, Form, Input, Row, Table, Select } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';

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

interface AppListProps {
  form: WrappedFormUtils;
}

const getTableData = (
  { current, pageSize }: PaginatedParams[0],
  formData: Object,
): Promise<Result> => {
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

const AppList = (props: AppListProps) => {
  const { getFieldDecorator } = props.form;
  const { tableProps, search, loading } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form: props.form,
  });

  console.log('loading', loading);

  const { type, changeType, submit, reset } = search;

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

  const advanceSearchForm = (
    <div>
      <Form>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="name">
              {getFieldDecorator('name')(<Input placeholder="name" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="email">
              {getFieldDecorator('email')(<Input placeholder="email" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="phone">
              {getFieldDecorator('phone')(<Input placeholder="phone" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" onClick={submit}>
              Search
            </Button>
            <Button onClick={reset} style={{ marginLeft: 16 }}>
              Reset
            </Button>
            <Button type="link" onClick={changeType}>
              Simple Search
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );

  const searchForm = (
    <div style={{ marginBottom: 16 }}>
      <Form style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {getFieldDecorator('gender', {
          initialValue: 'male',
        })(
          <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
            <Option value="">all</Option>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>,
        )}
        {getFieldDecorator('name')(
          <Input.Search placeholder="enter name" style={{ width: 240 }} onSearch={submit} />,
        )}
        <Button type="link" onClick={changeType}>
          Advanced Search
        </Button>
      </Form>
    </div>
  );

  return (
    <div>
      {type === 'simple' ? searchForm : advanceSearchForm}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};

export default Form.create()(AppList);
