/**
 * title: Data caching
 * desc: Form and Table data cache through cacheKey.
 *
 * title.zh-CN: 数据缓存
 * desc.zh-CN: 通过 cacheKey 可以实现 Form 和 Table 数据缓存。
 */

import React, { useState } from 'react';
import { Table, Pagination, Field, Form, Input, Button } from '@alifd/next';
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

const getTableData = (
  { current, pageSize, filters, sorter },
  formData: Object,
): Promise<Result> => {
  console.log(sorter, filters);

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
      list: res.results,
    }));
};

const AppList = () => {
  const field = Field.useField([]);

  const { tableProps, paginationProps, params, search } = useFusionTable(getTableData, {
    defaultPageSize: 5,
    field,
    cacheKey: 'tableProps',
  });

  const { sorter = {}, filters = {} } = params[0] || {};
  const { type, changeType, submit, reset } = search || {};

  const searchFrom = (
    <div style={{ marginBottom: 16 }}>
      <Form
        field={field}
        inline
        style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
      >
        <Form.Item label="name:">
          <Input name="name" placeholder="name" />
        </Form.Item>
        {type === 'advance' && (
          <>
            <Form.Item label="email:">
              <Input name="email" placeholder="email" />
            </Form.Item>
            <Form.Item label="phone:">
              <Input name="phone" placeholder="phone" />
            </Form.Item>
          </>
        )}
        <Form.Item label=" ">
          <Form.Submit type="primary" onClick={submit}>
            Search
          </Form.Submit>
        </Form.Item>

        <Form.Item label=" ">
          <Button onClick={reset}>reset</Button>
        </Form.Item>

        <Form.Item label=" ">
          <Button text type="primary" onClick={changeType}>
            {type === 'simple' ? 'Expand' : 'Close'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div>
      {searchFrom}

      <Table {...tableProps} filterParams={filters} sort={sorter} primaryKey="email">
        <Table.Column title="name" dataIndex="name.last" width={140} />
        <Table.Column title="email" dataIndex="email" width={500} />
        <Table.Column title="phone" sortable dataIndex="phone" width={500} />
        <Table.Column
          title="gender"
          filters={[
            { label: 'male', value: 'male' },
            { label: 'female', value: 'female' },
          ]}
          dataIndex="gender"
          width={500}
        />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
    </div>
  );
};

const Demo = () => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <Button
        type="primary"
        warning
        onClick={() => {
          setShow(!show);
        }}
        style={{ marginBottom: 16 }}
      >
        {show ? 'Click to destroy' : 'Click recovery'}
      </Button>
      {show && <AppList />}
    </div>
  );
};

export default Demo;
