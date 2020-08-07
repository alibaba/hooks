/**
 * title: Form Validate
 * desc: It will stop submit when validate error.
 *
 * title.zh-CN: 表单验证
 * desc.zh-CN: 表单验证失败，不会发送请求
 */

import React from 'react';
import { Table, Pagination, Field, Form, Input, Select, Icon } from '@alifd/next';
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

const getTableData = ({ current, pageSize }, formData: Object): Promise<Result> => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return fetch(`https://randomuser.me/api?results=${pageSize}&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: 55,
      list: res.results.slice(0, 10),
    }));
};

const AppList = () => {
  const field = Field.useField([]);
  const { paginationProps, tableProps, search } = useFusionTable(getTableData, {
    field,
    defaultParams: [{ current: 1, pageSize: 10 }, { name: 'hello' }],
  });
  const { submit } = search;

  const searchForm = (
    <div>
      <Form
        inline
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
        field={field}
      >
        <Form.Item label=" ">
          <Input
            name="name"
            innerAfter={<Icon type="search" size="xs" onClick={submit} style={{ margin: 4 }} />}
            placeholder="enter name"
            onPressEnter={submit}
            {...field.init('name', { rules: [{ required: true }] })}
          />
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <>
      {searchForm}
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
