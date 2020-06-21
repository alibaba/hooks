/**
 * title: Use DefaultParams
 * desc: useFusionTable sets the initial value through defaultParams, defaultParams is an array, the first value is the paging related parameter,
 *  and the second value is the form related data. If there is a second value, we will help you initialize the form! <br />
 *  It should be noted that the initial form data can be filled with simple and advance form data. We will help you select the form data in the currently activated type.
 *
 * title.zh-CN: 使用 defaultParams
 * desc.zh-CN: useFusionTable 通过 defaultParams 设置初始化值，defaultParams 是一个数组，第一个值为分页相关参数，第二个值为表单相关数据。如果有第二个值，我们会帮您初始化表单！<br />
 *  需要注意的是，初始化的表单数据可以填写 simple 和 advance 全量的表单数据，我们会帮您挑选当前激活的类型中的表单数据。
 */

import React from 'react';
import { Table, Pagination, Field, Form, Input, Button, Select, Icon } from '@alifd/next';
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
  const { paginationProps, tableProps, search, loading } = useFusionTable(getTableData, {
    field,
    defaultParams: [
      { current: 2, pageSize: 5 },
      { name: 'hello', email: 'abc@gmail.com', gender: 'female' },
    ],
    defaultType: 'advance',
  });
  const { type, changeType, submit, reset } = search;

  const advanceSearchForm = (
    <div>
      <Form
        inline
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
        field={field}
      >
        <Form.Item label="name:">
          <Input name="name" placeholder="name" />
        </Form.Item>
        <Form.Item label="email:">
          <Input name="email" placeholder="email" />
        </Form.Item>
        <Form.Item label="phone:">
          <Input name="phone" placeholder="phone" />
        </Form.Item>

        <Form.Item label=" ">
          <Form.Submit loading={loading} type="primary" onClick={submit}>
            Search
          </Form.Submit>
        </Form.Item>

        <Form.Item label=" ">
          <Button onClick={reset}>reset</Button>
        </Form.Item>

        <Form.Item label=" ">
          <Button text type="primary" onClick={changeType}>
            Simple Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  const searchForm = (
    <div>
      <Form
        inline
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
        field={field}
      >
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
            innerAfter={<Icon type="search" size="xs" onClick={submit} style={{ margin: 4 }} />}
            placeholder="enter name"
            onPressEnter={submit}
          />
        </Form.Item>

        <Form.Item label=" ">
          <Button text type="primary" onClick={changeType}>
            Advanced Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <>
      {type === 'simple' ? searchForm : advanceSearchForm}
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
