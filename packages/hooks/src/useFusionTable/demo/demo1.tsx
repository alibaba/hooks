/**
 * title: Form and Table data binding
 * desc: useFormTable returns a search object after receiving a form instance. This is an example of alibaba fusion.
 *
 * title.zh-CN: Form 与 Table 联动
 * desc.zh-CN: useFormTable 接收 form 实例后，会返回 search 对象。这是一个 Fusion Design 的示例。
 */

import React from 'react';
import { Table, Pagination, Field, Form, Input, Button, Select, Icon } from '@alifd/next';
import { useFusionTable } from '@umijs/hooks'


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
      query += `&${key}=${value}`
    }
  });

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      list: res.results.slice(0, 10),
    }));
};

const AppList = () => {
  const field = Field.useField([]);
  const { paginationProps, tableProps, search, loading } = useFusionTable(getTableData, {
    field,
  });
  const { type, changeType, submit, reset } = search;

  const advanceSearchForm = (
    <div>
      <Form inline style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} field={field}>
        <Form.Item label="name:">
          <Form.Item >
              <Input name="name" placeholder="name"/>
          </Form.Item>
        </Form.Item>
        <Form.Item label="email:">
          <Form.Item >
              <Input name="email" placeholder="email"/>
          </Form.Item>
        </Form.Item>
        <Form.Item label="phone:">
          <Form.Item >
              <Input name="phone" placeholder="phone"/>
          </Form.Item>
        </Form.Item>

        <Form.Item label=" ">
          <Form.Submit loading={loading} type="primary" onClick={submit}>Search</Form.Submit>
        </Form.Item>

        <Form.Item label=" ">
          <Button onClick={reset}>reset</Button>
        </Form.Item>

        <Form.Item label=" ">
          <Button text type="primary" onClick={changeType}>Simple Search</Button>
        </Form.Item>
      </Form>
    </div>
  );

  const searchForm = (
    <div>
      <Form inline style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} field={field}>
        <Form.Item label=" ">
          <Select name="gender" defaultValue="all" onChange={submit}>
            <Select.Option value="all">all</Select.Option>
            <Select.Option value="male">male</Select.Option>
            <Select.Option value="female">female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label=" ">
          <Input
            name="name"
            innerAfter={<Icon type="search" size="xs" onClick={submit} style={{ margin: 4 }}/>}
            placeholder="enter name"
            onPressEnter={submit}
          />
        </Form.Item>

        <Form.Item label=" ">
          <Button text type="primary" onClick={changeType}>Advanced Search</Button>
        </Form.Item>

      </Form>
    </div>
  );

  return (
    <>
      {type === 'simple' ? searchForm : advanceSearchForm}
      <Table
        {...tableProps}
        primaryKey="email"
      >
        <Table.Column title="name" dataIndex="name.last" width={140} />
        <Table.Column title="email" dataIndex="email" width={500} />
        <Table.Column title="phone" dataIndex="phone" width={500} />
        <Table.Column title="gender" dataIndex="gender" width={500} />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
    </>
  )
};

export default AppList;
