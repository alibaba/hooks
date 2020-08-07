/**
 * title: Form Validate
 * desc: It will stop submit when validate error.
 *
 * title.zh-CN: 表单验证
 * desc.zh-CN: 表单验证失败，不会发送请求
 */

import React from 'react';
import { Form, Input, Table, Select } from 'antd';
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
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form: props.form,
  });

  const { submit } = search;

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

  const searchForm = (
    <div style={{ marginBottom: 16 }}>
      <Form style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item label="Gender">
          {getFieldDecorator('gender', {
            initialValue: 'male',
          })(
            <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
              <Option value="">all</Option>
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: 'Lemmers',
            rules: [{ required: true, message: 'name is required' }],
          })(<Input.Search placeholder="enter name" style={{ width: 240 }} onSearch={submit} />)}
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div>
      {searchForm}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};

export default Form.create()(AppList);
