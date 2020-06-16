/**
 * title: Search form and table data binding
 * desc: If options have the form parameter, useAntdTable will take care of form data changing and data caching.
 *
 * title.zh-CN: 搜索表单与列表联动
 * desc.zh-CN: 如果 options 传了 form 参数，则我们会帮你管理 form 数据
 */

import React from 'react';
import { Button, Col, Form, Input, Row, Table, Select } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { useAntdTable } from '@umijs/hooks'
import { FnParams } from '@umijs/hooks/es/useAntdTable';

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
  data: Item[];
}

interface AppListProps {
  form: WrappedFormUtils;
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

const AppList = (props: AppListProps) => {
  const { getFieldDecorator } = props.form;
  const { tableProps, search } = useAntdTable<Result, Item>(getTableData, {
    defaultPageSize: 5,
    form: props.form,
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

  const searchFrom = (
    <div style={{ marginBottom: 16 }}>
      <Form style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {getFieldDecorator('gender', {
          initialValue: '',
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
      {type === 'simple' ? searchFrom : advanceSearchForm}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};

export default Form.create()(AppList);
